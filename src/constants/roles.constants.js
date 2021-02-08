// component's config object.
const components = {
  admin: {
    component: "Admin",
    url: "/admin",
    title: "Admin",
    icon: "Plus",
    module: 1,
    children: [],
    dashboard_item: true,
  },
  // dashboard: {
  //   component: "Dashboard",
  //   url: "",
  //   title: "Dashboard",
  //   icon: "Plus",
  //   module: 1,
  //   children: [],
  //   dashboard_item: false,
  // },
  selfEvaluation: {
    component: "Common",
    url: "/common",
    title: "Self Evaluation",
    icon: "Plus",
    module: 1,
    children: [
      {
        component: "DarasaForms",
        url: "/form",
        title: "Assignments",
        module: 2,
        dashboard_item: true,
      },
    ],
    dashboard_item: true,
  },
  learningMaterials: {
    component: "Dashboard",
    url: "",
    title: "Learning Materials",
    icon: "Plus",
    module: 1,
    children: [
      {
        component: "Classes",
        url: "/classes",
        title: "Animated Video Lessons",
        module: 2,
        dashboard_item: true,
      },
    ],
    dashboard_item: true,
  },
  profile: {
    component: "Profile",
    url: "/profile",
    title: "Profile",
    icon: "Plus",
    module: 1,
    children: [],
    dashboard_item: false,
  },
  publishers: {
    component: "Publishers",
    url: "/publishers",
    title: "Publishers",
    icon: "Plus",
    module: 1,
    children: [
      {
        component: "Child",
        url: "/child",
        title: "Child",
        module: 2,
      },
    ],
  },
  students: {
    component: "Students",
    url: "/students",
    title: "Students",
    icon: "Plus",
    module: 1,
    children: [],
    dashboard_item: true,
  },
  payment: {
    component: "Payment",
    url: "/payment",
    title: "Payment",
    icon: "Plus",
    module: 1,
    children: [],
    dashboard_item: false,
  },
  forms: {
    component: "DarasaForms",
    url: "/form",
    title: "Forms",
    icon: "Plus",
    module: 1,
    children: [],
    dashboard_item: false,
  },
  form: {
    component: "DarasaForms",
    url: "/form/:formID",
    title: "Form",
    icon: "Plus",
    module: 1,
    children: [],
    dashboard_item: false,
  },
  editForm: {
    component: "DarasaForms",
    url: "/form/:formID/edit",
    title: "Edit Form",
    icon: "Plus",
    module: 1,
    children: [],
    dashboard_item: false,
  },

  session: {
    component: "Classes",
    url: "/classes/:classID/:subjectID/:teacherID/:topicID/:sessionID",
    title: "Session",
    icon: "Plus",
    module: 1,
    children: [],
    dashboard_item: false,
  },
  class: {
    component: "Classes",
    url: "/classes/:classID",
    title: "Class",
    icon: "Plus",
    module: 1,
    children: [],
    dashboard_item: false,
  },
  topic: {
    component: "Classes",
    url: "/classes/:classID/:subjectID/:teacherID/:topicID",
    title: "Topic",
    icon: "Plus",
    module: 1,
    children: [],
    dashboard_item: false,
  },
  subject: {
    component: "Classes",
    url: "/classes/:classID/:subjectID",
    title: "Subject",
    icon: "Plus",
    module: 1,
    children: [],
    dashboard_item: false,
  },
  classes: {
    component: "Classes",
    url: "/classes",
    title: "Classes",
    icon: "Plus",
    module: 1,
    children: [],
    dashboard_item: false,
  },
  teachers: {
    component: "Teachers",
    url: "/teachers",
    title: "Teachers",
    icon: "Plus",
    module: 1,
    children: [],
    dashboard_item: true,
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
  // manager: {
  //   routes: [components.dashboard],
  // },
  // main: {
  //   routes: [components.dashboard],
  // },
  teacher: {
    routes: [],
  },
  // teacher: {
  //   routes: [components.teachers, components.publishers],
  // },
  student: {
    routes: [],
  },
  // student: {
  //   routes: [components.students],
  // },
  staff: {
    routes: [],
  },
  common: {
    routes: [
      {
        component: "Profile",
        url: "/profile",
        title: "Profile",
        icon: "Plus",
        module: 1,
        children: [],
        dashboard_item: false,
      },
      // components.dashboard,
      // components.common,
      components.learningMaterials,
      components.payment,
      components.classes,
      components.selfEvaluation,
      components.session,
      components.forms,
      components.form,
      components.class,
      components.topic,
      components.subject,
    ],
  },
};

export { modules, rolesConfig };
