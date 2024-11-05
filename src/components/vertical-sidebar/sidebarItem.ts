import {
  CircleIcon,
  CurrencyDollarIcon,
  DeviceLaptopIcon,
  FileStackIcon,
  HomeIcon,
  IdIcon,
  InfoSquareIcon,
  LinkIcon,
  NetworkIcon,
  ShieldLockIcon,
  TemplateIcon,
  ToolIcon,
  TrainIcon,
  UsersIcon,
  VolumeIcon,
} from 'vue-tabler-icons'
//  BarrierBlockIcon,
//   TicketOffIcon,

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  {
    title: 'Home',
    icon: HomeIcon,
    to: '/user/home',
  },
  { header: 'Communications' },
  {
    title: 'Newsletter',
    icon: InfoSquareIcon,
    to: '/user/newsletters',
  },

  {
    title: 'EBusinessCards',
    icon: IdIcon,
    to: '/user/ebusinessCard',
  },
  {
    title: 'TrainingCenter',
    icon: DeviceLaptopIcon,
    to: '/user/trainingCenter',

  },
  // {
  //   title: 'Sharingyourvoice',
  //   icon: VolumeIcon,
  //   to: '/user/shareyourvoice',
  // },

  { divider: true },
  { header: 'DocumentCenter' },
  {
    title: 'Policies',
    icon: FileStackIcon,
    to: '/user/policies',
  }, {
    title: 'Templates',
    icon: TemplateIcon,
    to: '/user/templates',
  },
  {
    title: 'Compliances',
    icon: ShieldLockIcon,
    to: '/user/compliances',
  },
  { divider: true },
  { header: 'Departments' },
  {
    title: 'HumanResources',
    icon: LinkIcon,
    to: '/',
    children: [
      {
        title: 'HRDocuments',
        icon: CircleIcon,
        to: '/user/hr/hrdocuments',
      },
      {
        title: 'HRServiceDisk',
        icon: CircleIcon,
        to: '/user/hr/hrservicedisk',
      },
      {
        title: 'Internalvacancies',
        icon: CircleIcon,
        to: '/user/hr/internalvacancies',
      },
      {
        title: 'Attendance',
        icon: CircleIcon,
        to: 'https://attendance.mobilitycairo.com/',
        type: 'external',
      },
      {
        title: 'TalentSoft',
        icon: CircleIcon,
        to: 'https://ratpdev.talent-soft.com/',
        type: 'external',
      },
      {
        title: 'PaySlip',
        icon: CircleIcon,
        to: 'https://hrservices.mobilitycairo.com/selfservice/',
        type: 'external',
      },

    ],
  },
  {
    title: 'CustomerService',
    icon: UsersIcon,
    to: '/',
    disabled: true,
    children: [
      // {
      //   title: 'WalletCard',
      //   icon: TicketOffIcon,
      //   to: '/fraud_admin',
      // }, {
      //   title: 'WebsitePopup',
      //   icon: BarrierBlockIcon,
      //   to: '/incidents_admin',
      // },
      {
        title: 'OnlinePayment',
        icon: CircleIcon,
        to: '/onlinepayment_admin',
      },
      // {
      //   title: 'OnlineSubscrptionForm',
      //   icon: VolumeIcon,
      //   to: '/sharingvoice_admin',
      // },
    ],
  },
  {
    title: 'Operations',
    icon: TrainIcon,
    to: '/',
    children: [
      {
        title: 'LRTDirvers',
        icon: CircleIcon,
        to: '/user/operations/lrt_dutyTable',
      },
    ],
  },
  {
    title: 'Finance',
    icon: CurrencyDollarIcon,
    to: '/',
    children: [
      {
        title: 'Expenses',
        icon: CircleIcon,
        to: 'https://apps.powerapps.com/play/e/default-b87cc266-09c4-40cc-8dfa-c92e08bf9cb4/a/ccc1c62f-908f-42e2-b586-d3c1fadadce3?tenantId=b87cc266-09c4-40cc-8dfa-c92e08bf9cb4&hint=69da39ff-80d6-43a9-9386-837253a8a9f3&sourcetime=1719833627725&source=portal#',
        type: 'external',
      },
    ],
  },
  {
    title: 'ITDigital',
    icon: NetworkIcon,
    to: '/',
    children: [
      {
        title: 'ITtickets',
        icon: VolumeIcon,
        to: '/sharingvoice_admin',
      },
    ],
  },
  {
    title: 'Maintenance',
    icon: ToolIcon,
    to: '/',
    children: [
      {
        title: 'Iamhere',
        icon: VolumeIcon,
        to: '/sharingvoice_admin',
      },
    ],
  },
  { divider: true },
  { header: 'Myfavourites' },

  {
    title: 'HRDocuments',
    icon: CircleIcon,
    to: '/user/hr/hrdocuments',
  },

  // {
  //   title: 'Icons',
  //   icon: WindmillIcon,
  //   to: '/forms/radio',
  //   children: [
  //     {
  //       title: 'Tabler Icons',
  //       icon: CircleIcon,
  //       to: '/icons/tabler'
  //     },
  //     {
  //       title: 'Material Icons',
  //       icon: CircleIcon,
  //       to: '/icons/material'
  //     }
  //   ]
  // },
  // { divider: true },
  // {
  //   title: 'Sample Page',
  //   icon: BrandChromeIcon,
  //   to: '/starter'
  // },
  // {
  //   title: 'Documentation',
  //   icon: HelpIcon,
  //   to: 'https://codedthemes.gitbook.io/berry-vuetify/',
  //   type: 'external'
  // }
]

// const sidebarItemModified = sidebarItem.filter((item: menu) => {
//   return ((typeof item.title === 'string' && item.title !== 'CustomerService' && item.title !== 'Operations' && item.title !== 'Finance' && item.title !== 'Maintenance' && appStore.empId !== 'RDMC-0000') || typeof item.title !== 'string') || appStore.empId === 'RDMC-0000' || appStore.empId === 'RDMC0187'
// })
export default sidebarItem
