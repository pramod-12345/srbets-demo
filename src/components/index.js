// common components
import Accordion from "./common/accordion"
import Advertisement from "./common/advertisement"
import Badge from "./common/badge"
import BetSlipEmpty from "./common/betSlipEmpty"
import CommonButton from "./common/button"
import { BannerCard, CasinoCard, SportsCard, BetCards, BetSlipCards, CasinoGamesCards } from "./common/cards"
import Container from "./common/container"
import CryptoDropdown from "./common/cryptoDropdown"
import Dropdown from "./common/dropdown"
import ModalDropdown from './common/modalDropdown'
import SectionHeader from "./common/headerSection"
import Input from "./common/input"
import Modal from "./common/Modal"
import ModalDetailItem from "./common/modalDetailItem"
import NoBetsFound from "./common/NoBetsFound"
import RadioButton from "./common/radio"
import Search from "./common/search"
import Seperator from "./common/seperator"
import Slider from "./common/slider"
import Tabs from "./common/tab"
import Typography from "./common/typography"
import Pagination from "./common/pagination"
import LazyImage from "./common/lazyImage"

// shared
import Footer from "./shared/footer"
import Navbar from "./shared/navbar"
import Sidebar from "./shared/sidebar"
import Table from "./shared/table"
import { ToastError , ToastSuccess } from "./shared/toaster"
import BetSlipSlider from "./shared/betSlipSlider"
import GlobalLoader from "./shared/GlobalLoader"
import MenuItems from "./shared/menuItems"



// Auth modals
import Login from "./modals/auth/login"
import Register from "./modals/auth/register"
import ForgotPassword from "./modals/auth/forgotPassword"
import SocialLogin from "./modals/auth/socialLogin"
import ResetPassword from "./modals/auth/resetPassword"
import AuthoriseRegistration from "./modals/auth/authoriseRegistration"
import RegisterTerms from './modals/auth/terms&Condition'

//  Wallet Modals
import AddNewBankAccount from "./modals/wallet/addNewBankAccount"
import Deposit from "./modals/wallet/deposit"
import DepositCryptoEth from "./modals/wallet/depositCryptoEth"
import DepositeViaUpi from "./modals/wallet/depositeViaUpi"
import WalletModal from "./modals/wallet"
import PaymentApproved from "./modals/wallet/paymentApproved"
import PaymentStatus from "./modals/wallet/PaymentStatus"
import TwoFactorAuthentication from "./modals/wallet/twoFactorAuthentication"
import Withdraw from "./modals/wallet/withdraw"
import BetDetails from "./modals/BetDetails"

export {
    Accordion,
    Advertisement,
    Pagination,
    LazyImage,
    Badge,
    BetSlipEmpty,
    CommonButton,
    BannerCard,
    CasinoCard,
    SportsCard,
    BetCards,
    BetSlipCards,
    CasinoGamesCards,
    Container,
    CryptoDropdown,
    Dropdown,
    ModalDropdown,
    SectionHeader,
    Input,
    Modal,
    ModalDetailItem,
    NoBetsFound,
    RadioButton,
    Search,
    Seperator,
    Slider,
    Tabs,
    Typography,
    Footer,
    Sidebar,
    Navbar,
    Table,
    ToastError,
    ToastSuccess,
    BetSlipSlider,
    GlobalLoader,
    MenuItems,
    Login,
    Register,
    ForgotPassword,
    RegisterTerms,
    ResetPassword,
    TwoFactorAuthentication,
    WalletModal,
    Deposit,
    DepositCryptoEth,
    DepositeViaUpi,
    BetDetails,
    AddNewBankAccount,
    PaymentApproved,
    PaymentStatus,
    Withdraw,
    SocialLogin,
    AuthoriseRegistration
}