import { CollectionConfig } from 'payload/types'
import { AlertBoxField } from '../../../src'
import IcecreamIcon from '../components/customAlertBox/IcecreamIcon'
import CustomAlert from '../components/customAlertBox/CustomAlert'

const AlertBoxExamples: CollectionConfig = {
  slug: 'alertBoxExamples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    ...AlertBoxField(
      {
        name: 'titleRequiredUI',
        admin: {
          condition: (data, siblingData) => !Boolean(siblingData.title),
        },
      },
      {
        type: 'info',
        message: 'Please be aware that the title is required for the mobile app.',
        icon: {
          enable: true,
        },
      },
    ),
    {
      name: 'title',
      type: 'text',
    },
    ...AlertBoxField(
      {
        name: 'alertBox',
      },
      {
        type: 'alert',
        message: 'Please contact reception before changing this page.',
      },
    ),

    ...AlertBoxField(
      {
        name: 'errorBox',
      },
      {
        type: 'error',
        message: "Systems are currently down and it's the weekend.",
      },
    ),
    ...AlertBoxField(
      {
        name: 'icecreamNotice',
      },
      {
        type: 'alert',
        message: "Important notice for the Ice Cream machine: it's out of order.",
        icon: {
          enable: true,
          Element: IcecreamIcon,
        },
      },
    ),
    ...AlertBoxField(
      {
        name: 'customNotice',
      },
      {
        type: 'custom',
        Content: CustomAlert,
      },
    ),
  ],
}

export default AlertBoxExamples
