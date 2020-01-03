<template>
	<view class="content">
    <view class="center-content">
      <image class="li-image" src="http://ms.geto.pro/static_mobile/images/company.png" style="width: 32px" mode="widthFix"></image><text class="company-name">{{client_info.name}}</text>
    </view>
	</view>
</template>

<script>
  import { ClientApi } from '../../utils/ClientApi.js'
  import uniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue'
  import uniList from "@dcloudio/uni-ui/lib/uni-list/uni-list.vue"
  import uniListItem from "@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue"
	export default {
		data() {
			return {
        client_info: {}
			}
    },
    components: {
      uniSearchBar,
      uniList,
      uniListItem
    },
		onLoad(options) {
      let item = JSON.parse(options.item)
      this.client_info = item
		},
		methods: {
    
    }
	}
</script>

<style lang='scss'>
  .center-content{
    text-align: center;
    line-height: 1;
  }
  .company-name{
    color: #3a3a3a;
    font-size: 17px;
    font-weight: 600;
  }
</style>
