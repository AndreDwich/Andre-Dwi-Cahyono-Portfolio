export const portfolioData = {
  commands: [
    { label: "Go to projects", action: "#projects", key: "P" },
    { label: "View technology stack", action: "#stack", key: "S" },
    { label: "Read my journey", action: "#journey", key: "J" },
    { label: "Start a conversation", action: "#contact", key: "C" }
  ],
  projects: [
    { title: "KKMP Kranggan", type: "Android application", stack: "Kotlin · Firebase · Cloudinary", category: "mobile" },
    { title: "Responsive web interfaces", type: "Web development", stack: "HTML · CSS · JavaScript · PHP", category: "frontend" },
    { title: "Application data layer", type: "Backend & integration", stack: "Firestore · MySQL · REST API", category: "backend" }
  ],
  stackTabs: {
    frontend: {
      file: "ProductForm.tsx",
      code: `function ProductForm() {\n  const { register, handleSubmit } = useForm<Product>();\n\n  return (\n    <form onSubmit={handleSubmit(saveProduct)}>\n      <Input {...register("name")} />\n      <Button type="submit">Save product</Button>\n    </form>\n  );\n}`
    },
    backend: {
      file: "products.route.ts",
      code: `router.post("/products", async (request, response) => {\n  const product = productSchema.parse(request.body);\n  const saved = await productService.create(product);\n\n  return response.status(201).json(saved);\n});`
    },
    data: {
      file: "product.repository.ts",
      code: `export async function createProduct(product: Product) {\n  return database.products.create({\n    data: { ...product, createdAt: new Date() }\n  });\n}`
    }
  },
  frameworkLab: {
    react: {
      label: "React.js",
      file: "ProductDashboard.tsx",
      status: "component-driven",
      flow: ["React UI", "REST API", "Firestore"],
      code: `function ProductDashboard() {\n  const { data, isLoading } = useProducts();\n\n  if (isLoading) return <LoadingState />;\n  return <ProductTable products={data} />;\n}`
    },
    vue: {
      label: "Vue.js",
      file: "ProductDashboard.vue",
      status: "progressive UI",
      flow: ["Vue UI", "REST API", "MySQL"],
      code: `<script setup>\nconst { products, loading } = useProducts();\n<\/script>\n\n<template>\n  <ProductTable :items="products" :loading="loading" />\n<\/template>`
    },
    node: {
      label: "Node.js",
      file: "products.controller.ts",
      status: "API layer",
      flow: ["Request", "Node.js API", "Database"],
      code: `export async function listProducts(request, response) {\n  const products = await productService.list();\n\n  return response.json({ data: products });\n}`
    }
  }
};
