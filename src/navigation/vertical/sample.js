// ** Icon imports
import Table from 'mdi-material-ui/Table'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import FormSelect from 'mdi-material-ui/FormSelect'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import LockOutline from 'mdi-material-ui/LockOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import ShieldOutline from 'mdi-material-ui/ShieldOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import ArchiveOutline from 'mdi-material-ui/ArchiveOutline'
import DotsHorizontal from 'mdi-material-ui/DotsHorizontal'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import VectorArrangeBelow from 'mdi-material-ui/VectorArrangeBelow'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import CalendarBlankOutline from 'mdi-material-ui/CalendarBlankOutline'
import PackageVariantClosed from 'mdi-material-ui/PackageVariantClosed'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import CheckboxMarkedCircleOutline from 'mdi-material-ui/CheckboxMarkedCircleOutline'
import CartPlus from 'mdi-material-ui/CartPlus'
import { FileMultiple } from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      title: 'Dashboards',
      icon: HomeOutline,
      path: '/dashboards/ecommerce'
    },
    {
      title: 'Products',
      icon: CartPlus,
      children: [
        {
          title: 'Products',
          path: '/products/product/list'
        },
        {
          title: 'Product Bulk Upload',
          path: '/products/bulk-upload'
        }

        // {
        //   title: 'Digital Products',
        //   path: '/products/digital-product/list'
        // },
        // {
        //   title: 'Product Reviews',
        //   path: '/products/product-reviews'
        // }
      ]
    }

    // {
    //   title: 'Uploaded File',
    //   icon: FileMultiple,
    //   path: '/uploads'
    // },
    // {
    //   title: 'Package',
    //   icon: CartPlus,
    //   children: [
    //     {
    //       title: 'Packages',
    //       path: '/apps/invoice/list'
    //     },
    //     {
    //       title: 'Purchase Packages',
    //       path: '/apps/invoice/preview'
    //     }
    //   ]
    // },
    // {
    //   title: 'Coupon',
    //   icon: CalendarBlankOutline,
    //   path: '/apps/calendar'
    // },
    // {
    //   title: 'Wholesale Products',
    //   icon: AccountOutline,
    //   path: '/apps/calendar'
    // },
    // {
    //   title: 'Auction',
    //   icon: LockOutline,
    //   children: [
    //     {
    //       title: 'All Auction Products',
    //       path: '/apps/roles'
    //     },
    //     {
    //       title: 'Auction Product Orders',
    //       path: '/apps/permissions'
    //     }
    //   ]
    // },
    // {
    //   title: 'POS Manager',
    //   icon: AccountOutline,
    //   path: '/apps/calendar'
    // },
    // {
    //   title: 'Orders',
    //   icon: AccountOutline,
    //   path: '/apps/calendar'
    // },
    // {
    //   title: 'Received Refund Request',
    //   icon: AccountOutline,
    //   path: '/apps/calendar'
    // },
    // {
    //   title: 'Shop Setting',
    //   icon: AccountOutline,
    //   path: '/apps/calendar'
    // },
    // {
    //   title: 'Payment History',
    //   icon: AccountOutline,
    //   path: '/apps/calendar'
    // },
    // {
    //   title: 'Money Withdraw',
    //   icon: AccountOutline,
    //   path: '/apps/calendar'
    // },
    // {
    //   title: 'Commission History',
    //   icon: AccountOutline,
    //   path: '/apps/calendar'
    // },
    // {
    //   title: 'Conversations',
    //   icon: AccountOutline,
    //   path: '/apps/calendar'
    // },
    // {
    //   title: 'Product Queries',
    //   icon: AccountOutline,
    //   path: '/apps/calendar'
    // },
    // {
    //   title: 'Support Ticket',
    //   icon: AccountOutline,
    //   path: '/apps/calendar'
    // }
  ]
}

export default navigation
