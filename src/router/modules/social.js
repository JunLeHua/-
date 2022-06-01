import Layout from "@/layout";
export default {
  path: "/social_securitys",
  component: Layout,
  children: [
    {
      path: "",
      name: "social",
      component: () => import("@/views/social_securitys/index"),
      meta: { title: "社保", icon: "table" },
    },
  ],
};
