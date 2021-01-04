// component's config object.
const components = {
  admin: {
    component: "Admin",
    url: "/admin",
    title: "Admin",
    icon: "play-circle",
    module: 1,
    children: {},
  },
  dashboard: {
    component: "Dashboard",
    url: "",
    title: "Dashboard",
    icon: "play-circle",
    module: 1,
    children: {},
  },
  profile: {
    component: "Profile",
    url: "/profile",
    title: "Profile",
    icon: "play-circle",
    module: 1,
    children: {},
  },
  publishers: {
    component: "Publishers",
    url: "/publishers",
    title: "Publishers",
    icon: "play-circle",
    module: 1,
    children: {
      child: {
        component: "Child",
        url: "/child",
        title: "Child",
        icon: "play-circle",
        module: 2,
      },
    },
  },
  students: {
    component: "Students",
    url: "/students",
    title: "Students",
    icon: "play-circle",
    module: 1,
    children: {},
  },
  teachers: {
    component: "Teachers",
    url: "/teachers",
    title: "Teachers",
    icon: "play-circle",
    module: 1,
    children: {},
  },
  common: {
    component: "Common",
    url: "/common",
    title: "Common",
    icon: "play-circle",
    module: 1,
    children: {},
  },
};

// modules for grouping.
const modules = {
  0: {
    title: "Dashboard",
    icon: "home",
    isExpendable: true,
  },
};

// component's access to roles.
const rolesConfig = {
  admin: {
    routes: [...Object.values(components)],
  },
  manager: {
    routes: [components.dashboard],
  },
  main: {
    routes: [components.dashboard],
  },
  teacher: {
    routes: [components.teachers, components.publishers],
  },
  student: {
    routes: [components.students],
  },
  staff: {
    routes: [],
  },
  common: {
    routes: [
      {
        component: "Profile",
        url: "/profile",
        title: "Profile",
        icon: "play-circle",
        module: 1,
        children: {},
      },
      components.dashboard,
      components.common,
    ],
  },
};

export { modules, rolesConfig };
