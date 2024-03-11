import Notification from "./AlertNotification";
import Card from "./Card";
import DialogBox from "./Dailog";
import GenerateForm from "./GenerateForms";
// eslint-disable-next-line import/no-cycle
import Modal from "./Modal";
import AppNotifications from "./Notifications";
import Spinner from "./Spinner";
import TabsComponent from "./Tabs";

const HoC = { Modal, Card, Notification, DialogBox, Spinner, GenerateForm, CreateDealerHeader: TabsComponent, AppNotifications };
export default HoC;
