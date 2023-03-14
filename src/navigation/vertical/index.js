// ** Icon imports
import CartPlus from 'mdi-material-ui/CartPlus'
import HomeOutline from 'mdi-material-ui/HomeOutline'

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
