import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faCog,
	faBell,
	faBan,
	faBug,
	faSearch,
	faCheck,
	faThLarge,
	faBars,
	faPaperclip,
	faEllipsisV,
	faEllipsisH,
	faCommentAlt,
	faPen,
	faShare,
	faCloudUploadAlt,
	faTimes,
	faArrowsAltV,
	faAlignLeft,
	faTable,
	faPrint,
	faAlignJustify,
	faAngleDoubleRight,
	faFile,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
	faCog,
	faBell,
	faBan,
	faBug,
	faSearch,
	faCheck,
	faThLarge,
	faBars,
	faPaperclip,
	faEllipsisV,
	faEllipsisH,
	faCommentAlt,
	faPen,
	faShare,
	faCloudUploadAlt,
	faTimes,
	faArrowsAltV,
	faAlignLeft,
	faTable,
	faPrint,
	faAlignJustify,
	faAngleDoubleRight,
	faFile
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
