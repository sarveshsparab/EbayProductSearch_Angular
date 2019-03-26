import {SellerContent} from '../item-details/seller-tab-details/SellerContent';
import {ShippingContent} from '../item-details/shipping-tab-details/ShippingContent';

export class WishListContent {
  ItemID = '';
  Image_URL = '';
  Title = '';
  Price = '';
  Shipping_Option = '';
  Seller_Name = '';
  Seller_Content_Obj: SellerContent;
  Shipping_Content_Obj: ShippingContent;
  Response_Status = '';
  Response_Message = '';
  TS: Date;
}
