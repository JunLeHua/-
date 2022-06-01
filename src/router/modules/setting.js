import Layout from "@/layout";
export default {
  path: "/setting",
  component: Layout,
  children: [
    {
      path: "",
      name: "setting",
      component: () => import("@/views/setting/index"),
      meta: { title: "设置", icon: "setting" },
    },
  ],
};
