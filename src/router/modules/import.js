import Layout from "@/layout";
export default {
  path: "/import",
  component: Layout,
  children: [
    // 显示导入导出
    {
      path: "", // 默认子路由(只要父路由匹配成功,子路由就会直接显示)
      component: () => import("@/views/import"), // 路由懒加载
    },
  ],
};
