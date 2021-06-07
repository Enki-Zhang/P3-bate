import Vue from 'vue';

import {
    Scrollbar,
    Loading,
    Message,
    Notification,
    MessageBox,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Row,
    Col,
    Dialog,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Input,
    InputNumber,
    Button,
    ButtonGroup,
    Select,
    Option,
    Radio,
    RadioGroup,
    Switch,
    Table,
    TableColumn,
    Pagination,
    Progress,
    DatePicker,
    TimePicker,
    Upload,
    Steps,
    Step,
    Tooltip,
    Image,
    Tabs,
    TabPane,
    CheckboxGroup,
    Checkbox,
    Badge,
    Link,
    Cascader,
    Popover,
    Popconfirm,
} from 'element-ui';

Vue.use(Scrollbar);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Dialog);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Switch);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Progress);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Pagination);
Vue.use(Upload);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Tooltip);
Vue.use(Image);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(Badge);
Vue.use(Link);
Vue.use(Cascader);
Vue.use(Popover);
Vue.use(Popconfirm);