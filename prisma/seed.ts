import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Seeding database...');

  // Clean database
  await prisma.vote.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.feature.deleteMany();
  await prisma.idea.deleteMany();
  await prisma.board.deleteMany();
  await prisma.reseller.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  console.log('Database cleaned');

  // Create tenants
  const acmeTenant = await prisma.tenant.create({
    data: {
      name: 'Acme Corporation',
      slug: 'acme',
    },
  });

  const globexTenant = await prisma.tenant.create({
    data: {
      name: 'Globex',
      slug: 'globex',
    },
  });

  console.log('Created tenants');

  // Create users with hashed passwords
  const acmeAdmin = await prisma.user.create({
    data: {
      email: 'admin@acme.com',
      password: await bcrypt.hash('password123', 10),
      firstName: 'John',
      lastName: 'Doe',
      role: 'TENANT_ADMIN',
      tenantId: acmeTenant.id,
    },
  });

  const acmeUser = await prisma.user.create({
    data: {
      email: 'user@acme.com',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'USER',
      tenantId: acmeTenant.id,
    },
  });

  const globexAdmin = await prisma.user.create({
    data: {
      email: 'admin@globex.com',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Bob',
      lastName: 'Johnson',
      role: 'TENANT_ADMIN',
      tenantId: globexTenant.id,
    },
  });

  // Create reseller
  const resellerUser = await prisma.user.create({
    data: {
      email: 'reseller@example.com',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Mike',
      lastName: 'Reseller',
      role: 'ADMIN',
      tenantId: acmeTenant.id,
    },
  });

  const reseller = await prisma.reseller.create({
    data: {
      name: 'IdeaFlow Reseller',
      email: 'reseller@example.com',
      userId: resellerUser.id,
    },
  });

  // Update tenants with reseller
  await prisma.tenant.update({
    where: { id: acmeTenant.id },
    data: { resellerId: reseller.id },
  });

  await prisma.tenant.update({
    where: { id: globexTenant.id },
    data: { resellerId: reseller.id },
  });

  console.log('Created users and reseller');

  // Create boards
  const acmeProductBoard = await prisma.board.create({
    data: {
      name: 'Product Roadmap',
      description: 'Our product development roadmap and features',
      tenantId: acmeTenant.id,
    },
  });

  const acmeMarketingBoard = await prisma.board.create({
    data: {
      name: 'Marketing Initiatives',
      description: 'Marketing campaign ideas and initiatives',
      tenantId: acmeTenant.id,
    },
  });

  const globexInnovationBoard = await prisma.board.create({
    data: {
      name: 'Innovation Hub',
      description: 'New product ideas and innovations',
      tenantId: globexTenant.id,
    },
  });

  console.log('Created boards');

  // Create ideas for Acme
  const acmeIdeas = await Promise.all([
    prisma.idea.create({
      data: {
        title: 'Mobile App Redesign',
        description: 'Redesign our mobile app with a more modern UI and improved user experience.',
        status: 'APPROVED',
        tenantId: acmeTenant.id,
        authorId: acmeAdmin.id,
        boardId: acmeProductBoard.id,
      },
    }),
    prisma.idea.create({
      data: {
        title: 'Customer Loyalty Program',
        description: 'Implement a customer loyalty program to increase retention and lifetime value.',
        status: 'UNDER_REVIEW',
        tenantId: acmeTenant.id,
        authorId: acmeUser.id,
        boardId: acmeMarketingBoard.id,
      },
    }),
    prisma.idea.create({
      data: {
        title: 'AI-Powered Recommendations',
        description: 'Use machine learning to provide personalized product recommendations.',
        status: 'NEW',
        tenantId: acmeTenant.id,
        authorId: acmeUser.id,
        boardId: acmeProductBoard.id,
      },
    }),
  ]);

  // Create ideas for Globex
  const globexIdeas = await Promise.all([
    prisma.idea.create({
      data: {
        title: 'Blockchain Integration',
        description: 'Integrate blockchain technology for secure and transparent transactions.',
        status: 'NEW',
        tenantId: globexTenant.id,
        authorId: globexAdmin.id,
        boardId: globexInnovationBoard.id,
      },
    }),
    prisma.idea.create({
      data: {
        title: 'Sustainable Packaging',
        description: 'Develop eco-friendly packaging solutions for all our products.',
        status: 'APPROVED',
        tenantId: globexTenant.id,
        authorId: globexAdmin.id,
        boardId: globexInnovationBoard.id,
      },
    }),
  ]);

  console.log('Created ideas');

  // Create features
  await Promise.all([
    prisma.feature.create({
      data: {
        title: 'User Profile Customization',
        description: 'Allow users to customize their profiles with themes and avatars.',
        priority: 'MEDIUM',
        status: 'PLANNED',
        tenantId: acmeTenant.id,
        boardId: acmeProductBoard.id,
        ideaId: acmeIdeas[0].id,
      },
    }),
    prisma.feature.create({
      data: {
        title: 'Push Notifications',
        description: 'Implement push notifications for important updates and events.',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        tenantId: acmeTenant.id,
        boardId: acmeProductBoard.id,
        ideaId: acmeIdeas[0].id,
      },
    }),
    prisma.feature.create({
      data: {
        title: 'Points System',
        description: 'Develop a points system for the loyalty program.',
        priority: 'HIGH',
        status: 'PLANNED',
        tenantId: acmeTenant.id,
        boardId: acmeMarketingBoard.id,
        ideaId: acmeIdeas[1].id,
      },
    }),
    prisma.feature.create({
      data: {
        title: 'Recycled Materials',
        description: 'Research and implement recycled materials for packaging.',
        priority: 'MEDIUM',
        status: 'IN_PROGRESS',
        tenantId: globexTenant.id,
        boardId: globexInnovationBoard.id,
        ideaId: globexIdeas[1].id,
      },
    }),
  ]);

  console.log('Created features');

  // Create comments
  await Promise.all([
    prisma.comment.create({
      data: {
        content: 'I think this is a great idea! We should prioritize this.',
        authorId: acmeUser.id,
        ideaId: acmeIdeas[0].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'We need to consider the development costs for this feature.',
        authorId: acmeAdmin.id,
        ideaId: acmeIdeas[0].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'This aligns well with our sustainability goals.',
        authorId: globexAdmin.id,
        ideaId: globexIdeas[1].id,
      },
    }),
  ]);

  console.log('Created comments');

  // Create votes
  await Promise.all([
    prisma.vote.create({
      data: {
        type: 'UPVOTE',
        userId: acmeUser.id,
        ideaId: acmeIdeas[0].id,
      },
    }),
    prisma.vote.create({
      data: {
        type: 'UPVOTE',
        userId: acmeAdmin.id,
        ideaId: acmeIdeas[0].id,
      },
    }),
    prisma.vote.create({
      data: {
        type: 'UPVOTE',
        userId: acmeAdmin.id,
        ideaId: acmeIdeas[1].id,
      },
    }),
    prisma.vote.create({
      data: {
        type: 'UPVOTE',
        userId: globexAdmin.id,
        ideaId: globexIdeas[1].id,
      },
    }),
  ]);

  console.log('Created votes');

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
