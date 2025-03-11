import { db } from "./db.server";
import { getCurrentTenantId } from "./session.server";

// Get current tenant information
export async function getCurrentTenant(request: Request) {
  const tenantId = await getCurrentTenantId(request);
  if (!tenantId) return null;

  return db.tenant.findUnique({
    where: { id: tenantId },
  });
}

// Create a new tenant
export async function createTenant(name: string, slug: string, resellerId?: string) {
  return db.tenant.create({
    data: {
      name,
      slug,
      ...(resellerId ? { resellerId } : {}),
    },
  });
}

// Get all tenants (for admin purposes)
export async function getAllTenants() {
  return db.tenant.findMany({
    orderBy: { name: "asc" },
  });
}

// Get tenant by slug
export async function getTenantBySlug(slug: string) {
  return db.tenant.findUnique({
    where: { slug },
  });
}

// Create a tenant context for database operations
// This ensures all operations are scoped to the current tenant
export function createTenantContext(tenantId: string) {
  return {
    // Ideas
    getIdeas: () => {
      return db.idea.findMany({
        where: { tenantId },
        include: {
          author: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          votes: true,
          comments: {
            include: {
              author: {
                select: { id: true, firstName: true, lastName: true },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    },
    
    getIdea: (id: string) => {
      return db.idea.findUnique({
        where: { id, tenantId },
        include: {
          author: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          votes: true,
          comments: {
            include: {
              author: {
                select: { id: true, firstName: true, lastName: true },
              },
            },
            orderBy: { createdAt: "asc" },
          },
          features: true,
        },
      });
    },
    
    createIdea: (data: any, authorId: string) => {
      return db.idea.create({
        data: {
          ...data,
          tenantId,
          authorId,
        },
      });
    },
    
    updateIdea: (id: string, data: any) => {
      return db.idea.update({
        where: { id, tenantId },
        data,
      });
    },
    
    deleteIdea: (id: string) => {
      return db.idea.delete({
        where: { id, tenantId },
      });
    },
    
    // Features
    getFeatures: () => {
      return db.feature.findMany({
        where: { tenantId },
        orderBy: { createdAt: "desc" },
      });
    },
    
    getFeature: (id: string) => {
      return db.feature.findUnique({
        where: { id, tenantId },
        include: {
          comments: {
            include: {
              author: {
                select: { id: true, firstName: true, lastName: true },
              },
            },
            orderBy: { createdAt: "asc" },
          },
        },
      });
    },
    
    createFeature: (data: any) => {
      return db.feature.create({
        data: {
          ...data,
          tenantId,
        },
      });
    },
    
    updateFeature: (id: string, data: any) => {
      return db.feature.update({
        where: { id, tenantId },
        data,
      });
    },
    
    deleteFeature: (id: string) => {
      return db.feature.delete({
        where: { id, tenantId },
      });
    },
    
    // Boards
    getBoards: () => {
      return db.board.findMany({
        where: { tenantId },
        include: {
          ideas: true,
          features: true,
        },
        orderBy: { name: "asc" },
      });
    },
    
    getBoard: (id: string) => {
      return db.board.findUnique({
        where: { id, tenantId },
        include: {
          ideas: {
            include: {
              author: {
                select: { id: true, firstName: true, lastName: true },
              },
              votes: true,
            },
          },
          features: true,
        },
      });
    },
    
    createBoard: (data: any) => {
      return db.board.create({
        data: {
          ...data,
          tenantId,
        },
      });
    },
    
    updateBoard: (id: string, data: any) => {
      return db.board.update({
        where: { id, tenantId },
        data,
      });
    },
    
    deleteBoard: (id: string) => {
      return db.board.delete({
        where: { id, tenantId },
      });
    },
  };
}
