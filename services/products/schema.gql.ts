import { gql } from 'apollo-server';

export default gql`
# Attribute contains the attribute_type of the specified attribute_code and entity_type
type Attribute {
  # The unique identifier for an attribute code. This value should be in lowercase letters without spaces.
  attribute_code: String
  # Attribute options list.
  attribute_options: [AttributeOption]
  # The data type of the attribute
  attribute_type: String
  # The type of entity that defines the attribute
  entity_type: String
}

# AttributeInput specifies the attribute_code and entity_type to search
input AttributeInput {
  # The unique identifier for an attribute code. This value should be in lowercase letters without spaces.
  attribute_code: String
  # The type of entity that defines the attribute
  entity_type: String
}

# Attribute option.
type AttributeOption {
  # Attribute option label.
  label: String
  # Attribute option value.
  value: String
}

# Breadcrumb item
type Breadcrumb {
  # Category ID
  category_id: Int
  # Category level
  category_level: Int
  # Category name
  category_name: String
  # Category URL key
  category_url_key: String
}

# BundleItem defines an individual item in a bundle product
type BundleItem {
  # An ID assigned to each type of item in a bundle product
  option_id: Int
  # An array of additional options for this bundle item
  options: [BundleItemOption]
  # he relative position of this item compared to the other bundle items
  position: Int
  # Indicates whether the item must be included in the bundle
  required: Boolean
  # The SKU of the bundle product
  sku: String
  # The display name of the item
  title: String
  # The input type that the customer uses to select the item. Examples include radio button and checkbox
  type: String
}

# BundleItemOption defines characteristics and options for a specific bundle item
type BundleItemOption {
  # Indicates whether the customer can change the number of items for this option
  can_change_quantity: Boolean
  # The ID assigned to the bundled item option
  id: Int
  # Indicates whether this option is the default option
  is_default: Boolean
  # The text that identifies the bundled item option
  label: String
  # When a bundle item contains multiple options, the relative position of this option compared to the other options
  position: Int
  # The price of the selected option
  price: Float
  # One of FIXED, PERCENT, or DYNAMIC
  price_type: PriceTypeEnum
  # Contains details about this product option
  product: ProductInterface
  # Indicates the quantity of this specific bundle item
  qty: Float
}

# BundleProduct defines basic features of a bundle product and contains multiple BundleItems
type BundleProduct implements ProductInterface & PhysicalProductInterface & CustomizableProductInterface {
  # The attribute set assigned to the product
  attribute_set_id: Int
  # Canonical URL
  canonical_url: String
  # The categories assigned to a product
  categories: [CategoryInterface]
  color: Int
  # The product's country of origin
  country_of_manufacture: String
  # Timestamp indicating when the product was created
  created_at: String
  # Detailed information about the product. The value can include simple HTML tags.
  description: ComplexTextValue
  # Indicates whether the bundle product has a dynamic price
  dynamic_price: Boolean
  # Indicates whether the bundle product has a dynamic SK
  dynamic_sku: Boolean
  # Indicates whether the bundle product has a dynamically calculated weight
  dynamic_weight: Boolean
  # Indicates whether a gift message is available
  gift_message_available: String
  # The ID number assigned to the product
  id: Int
  # The relative path to the main image on the product page
  image: ProductImage
  # An array containing information about individual bundle items
  items: [BundleItem]
  # A number representing the product's manufacturer
  manufacturer: Int
  # An array of MediaGalleryEntry objects
  media_gallery_entries: [MediaGalleryEntry]
  # A brief overview of the product for search results listings, maximum 255 characters
  meta_description: String
  # A comma-separated list of keywords that are visible only to search engines
  meta_keyword: String
  # A string that is displayed in the title bar and tab of the browser and in search results lists
  meta_title: String
  # The product name. Customers use this name to identify the product.
  name: String
  # The beginning date for new product listings, and determines if the product is featured as a new product
  new_from_date: String
  # The end date for new product listings
  new_to_date: String
  # Product stock only x left count
  only_x_left_in_stock: Float
  # An array of options for a customizable product
  options: [CustomizableOptionInterface]
  # If the product has multiple options, determines where they appear on the product page
  options_container: String
  # A ProductPrices object, indicating the price of an item
  price: ProductPrices
  # One of PRICE_RANGE or AS_LOW_AS
  price_view: PriceViewEnum
  # An array of ProductLinks objects
  product_links: [ProductLinksInterface]
  # Indicates whether to ship bundle items together or individually
  ship_bundle_items: ShipBundleItemsEnum
  # A short description of the product. Its use depends on the theme.
  short_description: ComplexTextValue
  # A number or code assigned to a product to identify the product, options, price, and manufacturer
  sku: String
  # The relative path to the small image, which is used on catalog pages
  small_image: ProductImage
  # The beginning date that a product has a special price
  special_from_date: String
  # The discounted price of the product
  special_price: Float
  # The end date that a product has a special price
  special_to_date: String
  # Stock status of the product
  stock_status: ProductStockStatus
  # The file name of a swatch image
  swatch_image: String
  # The relative path to the product's thumbnail image
  thumbnail: ProductImage
  # The price when tier pricing is in effect and the items purchased threshold has been reached
  tier_price: Float
  # An array of ProductTierPrices objects
  tier_prices: [ProductTierPrices]
  # One of simple, virtual, bundle, downloadable, grouped, or configurable
  type_id: String
  # Timestamp indicating when the product was updated
  updated_at: String
  # The part of the URL that identifies the product
  url_key: String
  # The part of the URL that precedes the url_key
  url_path: String
  # URL rewrites list
  url_rewrites: [UrlRewrite]
  # An array of websites in which the product is available
  websites: [Website]
  # The weight of the item, in units defined by the store
  weight: Float
}

# CategoryInterface contains the full set of attributes that can be returned in a category search
interface CategoryInterface {
  available_sort_by: [String]
  # Breadcrumbs, parent categories info
  breadcrumbs: [Breadcrumb]
  children_count: String
  # Timestamp indicating when the category was created
  created_at: String
  # The attribute to use for sorting
  default_sort_by: String
  # An optional description of the category
  description: String
  display_mode: String
  filter_price_range: Float
  # An ID that uniquely identifies the category
  id: Int
  image: String
  include_in_menu: Int
  is_anchor: Int
  landing_page: Int
  # Indicates the depth of the category within the tree
  level: Int
  meta_description: String
  meta_keywords: String
  meta_title: String
  # The display name of the category
  name: String
  # Category Path
  path: String
  # Category path in store
  path_in_store: String
  # The position of the category relative to other categories at the same level in tree
  position: Int
  # The number of products in the category
  product_count: Int
  # The list of products assigned to the category
  products(
    # Specifies the maximum number of results to return at once. This attribute is optional.
    pageSize: Int = 20
    # Specifies which page of results to return. The default value is 1.
    currentPage: Int = 1
    # Specifies which attribute to sort on, and whether to return the results in ascending or descending order.
    sort: ProductSortInput
  ): CategoryProducts
  # Timestamp indicating when the category was updated
  updated_at: String
  # The url key assigned to the category
  url_key: String
  # The url path assigned to the category
  url_path: String
}

# The category products object returned in the Category query
type CategoryProducts {
  # An array of products that are assigned to the category
  items: [ProductInterface]
  # An object that includes the page_info and currentPage values specified in the query
  page_info: SearchResultPageInfo
  # The number of products returned
  total_count: Int
}

# Category Tree implementation
type CategoryTree implements CategoryInterface {
  available_sort_by: [String]
  # Breadcrumbs, parent categories info
  breadcrumbs: [Breadcrumb]
  # Child categories tree
  children: [CategoryTree]
  children_count: String
  # Timestamp indicating when the category was created
  created_at: String
  # The attribute to use for sorting
  default_sort_by: String
  # An optional description of the category
  description: String
  display_mode: String
  filter_price_range: Float
  # An ID that uniquely identifies the category
  id: Int
  image: String
  include_in_menu: Int
  is_anchor: Int
  landing_page: Int
  # Indicates the depth of the category within the tree
  level: Int
  meta_description: String
  meta_keywords: String
  meta_title: String
  # The display name of the category
  name: String
  # Category Path
  path: String
  # Category path in store
  path_in_store: String
  # The position of the category relative to other categories at the same level in tree
  position: Int
  # The number of products in the category
  product_count: Int
  # The list of products assigned to the category
  products(
    # Specifies the maximum number of results to return at once. This attribute is optional.
    pageSize: Int = 20
    # Specifies which page of results to return. The default value is 1.
    currentPage: Int = 1
    # Specifies which attribute to sort on, and whether to return the results in ascending or descending order.
    sort: ProductSortInput
  ): CategoryProducts
  # Timestamp indicating when the category was updated
  updated_at: String
  # The url key assigned to the category
  url_key: String
  # The url path assigned to the category
  url_path: String
}

# CMS block defines all CMS block information
type CmsBlock {
  # CMS block content
  content: String
  # CMS block identifier
  identifier: String
  # CMS block title
  title: String
}

# CMS blocks information
type CmsBlocks {
  # An array of CMS blocks
  items: [CmsBlock]
}

# CMS page defines all CMS page information
type CmsPage {
  # CMS page content
  content: String
  # CMS page content heading
  content_heading: String
  # CMS page meta description
  meta_description: String
  # CMS page meta keywords
  meta_keywords: String
  # CMS page meta title
  meta_title: String
  # CMS page content heading
  page_layout: String
  # CMS page title
  title: String
  # URL key of CMS page
  url_key: String
}

type ComplexTextValue {
  # HTML format
  html: String!
}

# ConfigurableAttributeOption contains the value_index (and other related
# information) assigned to a configurable product option
type ConfigurableAttributeOption {
  # The ID assigned to the attribute
  code: String
  # A string that describes the configurable attribute option
  label: String
  # A unique index number assigned to the configurable product option
  value_index: Int
}

# ConfigurableProduct defines basic features of a configurable product and its simple product variants
type ConfigurableProduct implements ProductInterface & PhysicalProductInterface & CustomizableProductInterface {
  # The attribute set assigned to the product
  attribute_set_id: Int
  # Canonical URL
  canonical_url: String
  # The categories assigned to a product
  categories: [CategoryInterface]
  color: Int
  # An array of linked simple product items
  configurable_options: [ConfigurableProductOptions]
  # The product's country of origin
  country_of_manufacture: String
  # Timestamp indicating when the product was created
  created_at: String
  # Detailed information about the product. The value can include simple HTML tags.
  description: ComplexTextValue
  # Indicates whether a gift message is available
  gift_message_available: String
  # The ID number assigned to the product
  id: Int
  # The relative path to the main image on the product page
  image: ProductImage
  # A number representing the product's manufacturer
  manufacturer: Int
  # An array of MediaGalleryEntry objects
  media_gallery_entries: [MediaGalleryEntry]
  # A brief overview of the product for search results listings, maximum 255 characters
  meta_description: String
  # A comma-separated list of keywords that are visible only to search engines
  meta_keyword: String
  # A string that is displayed in the title bar and tab of the browser and in search results lists
  meta_title: String
  # The product name. Customers use this name to identify the product.
  name: String
  # The beginning date for new product listings, and determines if the product is featured as a new product
  new_from_date: String
  # The end date for new product listings
  new_to_date: String
  # Product stock only x left count
  only_x_left_in_stock: Float
  # An array of options for a customizable product
  options: [CustomizableOptionInterface]
  # If the product has multiple options, determines where they appear on the product page
  options_container: String
  # A ProductPrices object, indicating the price of an item
  price: ProductPrices
  # An array of ProductLinks objects
  product_links: [ProductLinksInterface]
  # A short description of the product. Its use depends on the theme.
  short_description: ComplexTextValue
  # A number or code assigned to a product to identify the product, options, price, and manufacturer
  sku: String
  # The relative path to the small image, which is used on catalog pages
  small_image: ProductImage
  # The beginning date that a product has a special price
  special_from_date: String
  # The discounted price of the product
  special_price: Float
  # The end date that a product has a special price
  special_to_date: String
  # Stock status of the product
  stock_status: ProductStockStatus
  # The file name of a swatch image
  swatch_image: String
  # The relative path to the product's thumbnail image
  thumbnail: ProductImage
  # The price when tier pricing is in effect and the items purchased threshold has been reached
  tier_price: Float
  # An array of ProductTierPrices objects
  tier_prices: [ProductTierPrices]
  # One of simple, virtual, bundle, downloadable, grouped, or configurable
  type_id: String
  # Timestamp indicating when the product was updated
  updated_at: String
  # The part of the URL that identifies the product
  url_key: String
  # The part of the URL that precedes the url_key
  url_path: String
  # URL rewrites list
  url_rewrites: [UrlRewrite]
  # An array of variants of products
  variants: [ConfigurableVariant]
  # An array of websites in which the product is available
  websites: [Website]
  # The weight of the item, in units defined by the store
  weight: Float
}

# ConfigurableProductOptions defines configurable attributes for the specified product
type ConfigurableProductOptions {
  # A string that identifies the attribute
  attribute_code: String
  # The ID assigned to the attribute
  attribute_id: String
  # The configurable option ID number assigned by the system
  id: Int
  # A string that describes the configurable product option, which is displayed on the UI
  label: String
  # A number that indicates the order in which the attribute is displayed
  position: Int
  # This is the same as a product's id field
  product_id: Int
  # Indicates whether the option is the default
  use_default: Boolean
  # An array that defines the value_index codes assigned to the configurable product
  values: [ConfigurableProductOptionsValues]
}

# ConfigurableProductOptionsValues contains the index number assigned to a configurable product option
type ConfigurableProductOptionsValues {
  # The label of the product on the default store
  default_label: String
  # The label of the product
  label: String
  # The label of the product on the current store
  store_label: String
  # Indicates whether to use the default_label
  use_default_value: Boolean
  # A unique index number assigned to the configurable product option
  value_index: Int
}

# An array containing all the simple product variants of a configurable product
type ConfigurableVariant {
  attributes: [ConfigurableAttributeOption]
  product: SimpleProduct
}

type Country {
  available_regions: [Region]
  full_name_english: String
  full_name_locale: String
  id: String
  three_letter_abbreviation: String
  two_letter_abbreviation: String
}

# The list of countries codes
enum CountryCodeEnum {
  # Afghanistan
  AF
  # Åland Islands
  AX
  # Albania
  AL
  # Algeria
  DZ
  # American Samoa
  AS
  # Andorra
  AD
  # Angola
  AO
  # Anguilla
  AI
  # Antarctica
  AQ
  # Antigua & Barbuda
  AG
  # Argentina
  AR
  # Armenia
  AM
  # Aruba
  AW
  # Australia
  AU
  # Austria
  AT
  # Azerbaijan
  AZ
  # Bahamas
  BS
  # Bahrain
  BH
  # Bangladesh
  BD
  # Barbados
  BB
  # Belarus
  BY
  # Belgium
  BE
  # Belize
  BZ
  # Benin
  BJ
  # Bermuda
  BM
  # Bhutan
  BT
  # Bolivia
  BO
  # Bosnia & Herzegovina
  BA
  # Botswana
  BW
  # Bouvet Island
  BV
  # Brazil
  BR
  # British Indian Ocean Territory
  IO
  # British Virgin Islands
  VG
  # Brunei
  BN
  # Bulgaria
  BG
  # Burkina Faso
  BF
  # Burundi
  BI
  # Cambodia
  KH
  # Cameroon
  CM
  # Canada
  CA
  # Cape Verde
  CV
  # Cayman Islands
  KY
  # Central African Republic
  CF
  # Chad
  TD
  # Chile
  CL
  # China
  CN
  # Christmas Island
  CX
  # Cocos (Keeling) Islands
  CC
  # Colombia
  CO
  # Comoros
  KM
  # Congo -Brazzaville
  CG
  # Congo - Kinshasa
  CD
  # Cook Islands
  CK
  # Costa Rica
  CR
  # Côte d’Ivoire
  CI
  # Croatia
  HR
  # Cuba
  CU
  # Cyprus
  CY
  # Czech Republic
  CZ
  # Denmark
  DK
  # Djibouti
  DJ
  # Dominica
  DM
  # Dominican Republic
  DO
  # Ecuador
  EC
  # Egypt
  EG
  # El Salvador
  SV
  # Equatorial Guinea
  GQ
  # Eritrea
  ER
  # Estonia
  EE
  # Ethiopia
  ET
  # Falkland Islands
  FK
  # Faroe Islands
  FO
  # Fiji
  FJ
  # Finland
  FI
  # France
  FR
  # French Guiana
  GF
  # French Polynesia
  PF
  # French Southern Territories
  TF
  # Gabon
  GA
  # Gambia
  GM
  # Georgia
  GE
  # Germany
  DE
  # Ghana
  GH
  # Gibraltar
  GI
  # Greece
  GR
  # Greenland
  GL
  # Grenada
  GD
  # Guadeloupe
  GP
  # Guam
  GU
  # Guatemala
  GT
  # Guernsey
  GG
  # Guinea
  GN
  # Guinea-Bissau
  GW
  # Guyana
  GY
  # Haiti
  HT
  # Heard &amp; McDonald Islands
  HM
  # Honduras
  HN
  # Hong Kong SAR China
  HK
  # Hungary
  HU
  # Iceland
  IS
  # India
  IN
  # Indonesia
  ID
  # Iran
  IR
  # Iraq
  IQ
  # Ireland
  IE
  # Isle of Man
  IM
  # Israel
  IL
  # Italy
  IT
  # Jamaica
  JM
  # Japan
  JP
  # Jersey
  JE
  # Jordan
  JO
  # Kazakhstan
  KZ
  # Kenya
  KE
  # Kiribati
  KI
  # Kuwait
  KW
  # Kyrgyzstan
  KG
  # Laos
  LA
  # Latvia
  LV
  # Lebanon
  LB
  # Lesotho
  LS
  # Liberia
  LR
  # Libya
  LY
  # Liechtenstein
  LI
  # Lithuania
  LT
  # Luxembourg
  LU
  # Macau SAR China
  MO
  # Macedonia
  MK
  # Madagascar
  MG
  # Malawi
  MW
  # Malaysia
  MY
  # Maldives
  MV
  # Mali
  ML
  # Malta
  MT
  # Marshall Islands
  MH
  # Martinique
  MQ
  # Mauritania
  MR
  # Mauritius
  MU
  # Mayotte
  YT
  # Mexico
  MX
  # Micronesia
  FM
  # Moldova
  MD
  # Monaco
  MC
  # Mongolia
  MN
  # Montenegro
  ME
  # Montserrat
  MS
  # Morocco
  MA
  # Mozambique
  MZ
  # Myanmar (Burma)
  MM
  # Namibia
  NA
  # Nauru
  NR
  # Nepal
  NP
  # Netherlands
  NL
  # Netherlands Antilles
  AN
  # New Caledonia
  NC
  # New Zealand
  NZ
  # Nicaragua
  NI
  # Niger
  NE
  # Nigeria
  NG
  # Niue
  NU
  # Norfolk Island
  NF
  # Northern Mariana Islands
  MP
  # North Korea
  KP
  # Norway
  NO
  # Oman
  OM
  # Pakistan
  PK
  # Palau
  PW
  # Palestinian Territories
  PS
  # Panama
  PA
  # Papua New Guinea
  PG
  # Paraguay
  PY
  # Peru
  PE
  # Philippines
  PH
  # Pitcairn Islands
  PN
  # Poland
  PL
  # Portugal
  PT
  # Qatar
  QA
  # Réunion
  RE
  # Romania
  RO
  # Russia
  RU
  # Rwanda
  RW
  # Samoa
  WS
  # San Marino
  SM
  # São Tomé & Príncipe
  ST
  # Saudi Arabia
  SA
  # Senegal
  SN
  # Serbia
  RS
  # Seychelles
  SC
  # Sierra Leone
  SL
  # Singapore
  SG
  # Slovakia
  SK
  # Slovenia
  SI
  # Solomon Islands
  SB
  # Somalia
  SO
  # South Africa
  ZA
  # South Georgia & South Sandwich Islands
  GS
  # South Korea
  KR
  # Spain
  ES
  # Sri Lanka
  LK
  # St. Barthélemy
  BL
  # St. Helena
  SH
  # St. Kitts & Nevis
  KN
  # St. Lucia
  LC
  # St. Martin
  MF
  # St. Pierre & Miquelon
  PM
  # St. Vincent & Grenadines
  VC
  # Sudan
  SD
  # Suriname
  SR
  # Svalbard & Jan Mayen
  SJ
  # Swaziland
  SZ
  # Sweden
  SE
  # Switzerland
  CH
  # Syria
  SY
  # Taiwan
  TW
  # Tajikistan
  TJ
  # Tanzania
  TZ
  # Thailand
  TH
  # Timor-Leste
  TL
  # Togo
  TG
  # Tokelau
  TK
  # Tonga
  TO
  # Trinidad & Tobago
  TT
  # Tunisia
  TN
  # Turkey
  TR
  # Turkmenistan
  TM
  # Turks & Caicos Islands
  TC
  # Tuvalu
  TV
  # Uganda
  UG
  # Ukraine
  UA
  # United Arab Emirates
  AE
  # United Kingdom
  GB
  # United States
  US
  # Uruguay
  UY
  # U.S. Outlying Islands
  UM
  # U.S. Virgin Islands
  VI
  # Uzbekistan
  UZ
  # Vanuatu
  VU
  # Vatican City
  VA
  # Venezuela
  VE
  # Vietnam
  VN
  # Wallis & Futuna
  WF
  # Western Sahara
  EH
  # Yemen
  YE
  # Zambia
  ZM
  # Zimbabwe
  ZW
}

type Currency {
  available_currency_codes: [String]
  base_currency_code: String
  base_currency_symbol: String
  default_display_currecy_code: String
  default_display_currecy_symbol: String
  exchange_rates: [ExchangeRate]
}

# The list of available currency codes
enum CurrencyEnum {
  AFN
  ALL
  AZN
  DZD
  AOA
  ARS
  AMD
  AWG
  AUD
  BSD
  BHD
  BDT
  BBD
  BYR
  BZD
  BMD
  BTN
  BOB
  BAM
  BWP
  BRL
  GBP
  BND
  BGN
  BUK
  BIF
  KHR
  CAD
  CVE
  CZK
  KYD
  GQE
  CLP
  CNY
  COP
  KMF
  CDF
  CRC
  HRK
  CUP
  DKK
  DJF
  DOP
  XCD
  EGP
  SVC
  ERN
  EEK
  ETB
  EUR
  FKP
  FJD
  GMD
  GEK
  GEL
  GHS
  GIP
  GTQ
  GNF
  GYD
  HTG
  HNL
  HKD
  HUF
  ISK
  INR
  IDR
  IRR
  IQD
  ILS
  JMD
  JPY
  JOD
  KZT
  KES
  KWD
  KGS
  LAK
  LVL
  LBP
  LSL
  LRD
  LYD
  LTL
  MOP
  MKD
  MGA
  MWK
  MYR
  MVR
  LSM
  MRO
  MUR
  MXN
  MDL
  MNT
  MAD
  MZN
  MMK
  NAD
  NPR
  ANG
  YTL
  NZD
  NIC
  NGN
  KPW
  NOK
  OMR
  PKR
  PAB
  PGK
  PYG
  PEN
  PHP
  PLN
  QAR
  RHD
  RON
  RUB
  RWF
  SHP
  STD
  SAR
  RSD
  SCR
  SLL
  SGD
  SKK
  SBD
  SOS
  ZAR
  KRW
  LKR
  SDG
  SRD
  SZL
  SEK
  CHF
  SYP
  TWD
  TJS
  TZS
  THB
  TOP
  TTD
  TND
  TMM
  USD
  UGX
  UAH
  AED
  UYU
  UZS
  VUV
  VEB
  VEF
  VND
  CHE
  CHW
  XOF
  WST
  YER
  ZMK
  ZWD
  TRY
  AZM
  ROL
  TRL
  XPF
}

# CustomAttributeMetadata defines an array of attribute_codes and entity_types
type CustomAttributeMetadata {
  # An array of attributes
  items: [Attribute]
}

# Customer defines the customer name and address and other details
type Customer {
  # An array containing the customer's shipping and billing addresses
  addresses: [CustomerAddress]
  # Timestamp indicating when the account was created
  created_at: String
  # The ID assigned to the billing address
  default_billing: String
  # The ID assigned to the shipping address
  default_shipping: String
  # The customer's date of birth
  dob: String
  # The customer's email address. Required
  email: String
  # The customer's first name
  firstname: String
  # The group assigned to the user. Default values are 0 (Not logged in), 1 (General), 2 (Wholesale), and 3 (Retailer)
  group_id: Int
  # The ID assigned to the customer
  id: Int
  # Indicates whether the customer is subscribed to the company's newsletter
  is_subscribed: Boolean
  # The customer's family name
  lastname: String
  # The customer's middle name
  middlename: String
  # An honorific, such as Dr., Mr., or Mrs.
  prefix: String
  # A value such as Sr., Jr., or III
  suffix: String
  # The customer's Tax/VAT number (for corporate customers)
  taxvat: String
}

# CustomerAddress contains detailed information about a customer's billing and shipping addresses
type CustomerAddress {
  # The city or town
  city: String
  # The customer's company
  company: String
  # The customer's country
  country_id: String
  # Address custom attributes
  custom_attributes: [CustomerAddressAttribute]
  # The customer ID
  customer_id: Int
  # Indicates whether the address is the default billing address
  default_billing: Boolean
  # Indicates whether the address is the default shipping address
  default_shipping: Boolean
  # Address extension attributes
  extension_attributes: [CustomerAddressAttribute]
  # The fax number
  fax: String
  # The first name of the person associated with the shipping/billing address
  firstname: String
  # The ID assigned to the address object
  id: Int
  # The family name of the person associated with the shipping/billing address
  lastname: String
  # The middle name of the person associated with the shipping/billing address
  middlename: String
  # The customer's ZIP or postal code
  postcode: String
  # An honorific, such as Dr., Mr., or Mrs.
  prefix: String
  # An object containing the region name, region code, and region ID
  region: CustomerAddressRegion
  # A number that uniquely identifies the state, province, or other area
  region_id: Int
  # An array of strings that define the street number and name
  street: [String]
  # A value such as Sr., Jr., or III
  suffix: String
  # The telephone number
  telephone: String
  # The customer's Tax/VAT number (for corporate customers)
  vat_id: String
}

type CustomerAddressAttribute {
  # Attribute code
  attribute_code: String
  # Attribute value
  value: String
}

input CustomerAddressAttributeInput {
  # Attribute code
  attribute_code: String!
  # Attribute value
  value: String!
}

input CustomerAddressInput {
  # The city or town
  city: String
  # The customer's company
  company: String
  # The customer's country
  country_id: CountryCodeEnum
  # Address custom attributes
  custom_attributes: [CustomerAddressAttributeInput]
  # Indicates whether the address is the default billing address
  default_billing: Boolean
  # Indicates whether the address is the default shipping address
  default_shipping: Boolean
  # The fax number
  fax: String
  # The first name of the person associated with the shipping/billing address
  firstname: String
  # The family name of the person associated with the shipping/billing address
  lastname: String
  # The middle name of the person associated with the shipping/billing address
  middlename: String
  # The customer's ZIP or postal code
  postcode: String
  # An honorific, such as Dr., Mr., or Mrs.
  prefix: String
  # An object containing the region name, region code, and region ID
  region: CustomerAddressRegionInput
  # An array of strings that define the street number and name
  street: [String]
  # A value such as Sr., Jr., or III
  suffix: String
  # The telephone number
  telephone: String
  # The customer's Tax/VAT number (for corporate customers)
  vat_id: String
}

# CustomerAddressRegion defines the customer's state or province
type CustomerAddressRegion {
  # The state or province name
  region: String
  # The address region code
  region_code: String
  # Uniquely identifies the region
  region_id: Int
}

# CustomerAddressRegionInput defines the customer's state or province
input CustomerAddressRegionInput {
  # The state or province name
  region: String
  # The address region code
  region_code: String
  # Uniquely identifies the region
  region_id: Int
}

type CustomerDownloadableProduct {
  date: String
  download_url: String
  order_increment_id: String
  remaining_downloads: String
  status: String
}

type CustomerDownloadableProducts {
  # List of purchased downloadable items
  items: [CustomerDownloadableProduct]
}

input CustomerInput {
  # The customer's date of birth
  dob: String
  # The customer's email address. Required
  email: String
  # The customer's first name
  firstname: String
  # The customer's gender(Male - 1, Female - 2)
  gender: Int
  # Indicates whether the customer is subscribed to the company's newsletter
  is_subscribed: Boolean
  # The customer's family name
  lastname: String
  # The customer's middle name
  middlename: String
  # The customer's password
  password: String
  # An honorific, such as Dr., Mr., or Mrs.
  prefix: String
  # A value such as Sr., Jr., or III
  suffix: String
  # The customer's Tax/VAT number (for corporate customers)
  taxvat: String
}

# Order mapping fields
type CustomerOrder {
  created_at: String
  grand_total: Float
  id: Int
  increment_id: String
  status: String
}

type CustomerOrders {
  # Array of orders
  items: [CustomerOrder]
}

type CustomerOutput {
  customer: Customer!
}

type CustomerToken {
  # The customer token
  token: String
}

# CustomizableAreaOption contains information about a text area that is defined as part of a customizable option
type CustomizableAreaOption implements CustomizableOptionInterface {
  # Option ID
  option_id: Int
  # The Stock Keeping Unit of the base product
  product_sku: String
  # Indicates whether the option is required
  required: Boolean
  # The order in which the option is displayed
  sort_order: Int
  # The display name for this option
  title: String
  # An object that defines a text area
  value: CustomizableAreaValue
}

# CustomizableAreaValue defines the price and sku of a product whose page contains a customized text area
type CustomizableAreaValue {
  # The maximum number of characters that can be entered for this customizable option
  max_characters: Int
  # The price assigned to this option
  price: Float
  # FIXED, PERCENT, or DYNAMIC
  price_type: PriceTypeEnum
  # The Stock Keeping Unit for this option
  sku: String
}

# CustomizableDateOption contains information about a date picker that is defined as part of a customizable option
type CustomizableDateOption implements CustomizableOptionInterface {
  # Option ID
  option_id: Int
  # The Stock Keeping Unit of the base product
  product_sku: String
  # Indicates whether the option is required
  required: Boolean
  # The order in which the option is displayed
  sort_order: Int
  # The display name for this option
  title: String
  # An object that defines a date field in a customizable option.
  value: CustomizableDateValue
}

# CustomizableDateValue defines the price and sku of a product whose page contains a customized date picker
type CustomizableDateValue {
  # The price assigned to this option
  price: Float
  # FIXED, PERCENT, or DYNAMIC
  price_type: PriceTypeEnum
  # The Stock Keeping Unit for this option
  sku: String
}

# CustomizableDropDownOption contains information about a drop down menu that is defined as part of a customizable option
type CustomizableDropDownOption implements CustomizableOptionInterface {
  # Option ID
  option_id: Int
  # Indicates whether the option is required
  required: Boolean
  # The order in which the option is displayed
  sort_order: Int
  # The display name for this option
  title: String
  # An array that defines the set of options for a drop down menu
  value: [CustomizableDropDownValue]
}

# CustomizableDropDownValue defines the price and sku of a product whose page contains a customized drop down menu
type CustomizableDropDownValue {
  # The ID assigned to the value
  option_type_id: Int
  # The price assigned to this option
  price: Float
  # FIXED, PERCENT, or DYNAMIC
  price_type: PriceTypeEnum
  # The Stock Keeping Unit for this option
  sku: String
  # The order in which the option is displayed
  sort_order: Int
  # The display name for this option
  title: String
}

# CustomizableFieldOption contains information about a text field that is defined as part of a customizable option
type CustomizableFieldOption implements CustomizableOptionInterface {
  # Option ID
  option_id: Int
  # The Stock Keeping Unit of the base product
  product_sku: String
  # Indicates whether the option is required
  required: Boolean
  # The order in which the option is displayed
  sort_order: Int
  # The display name for this option
  title: String
  # An object that defines a text field
  value: CustomizableFieldValue
}

# CustomizableFieldValue defines the price and sku of a product whose page contains a customized text field
type CustomizableFieldValue {
  # The maximum number of characters that can be entered for this customizable option
  max_characters: Int
  # The price of the custom value
  price: Float
  # FIXED, PERCENT, or DYNAMIC
  price_type: PriceTypeEnum
  # The Stock Keeping Unit for this option
  sku: String
}

# CustomizableFileOption contains information about a file picker that is defined as part of a customizable option
type CustomizableFileOption implements CustomizableOptionInterface {
  # Option ID
  option_id: Int
  # The Stock Keeping Unit of the base product
  product_sku: String
  # Indicates whether the option is required
  required: Boolean
  # The order in which the option is displayed
  sort_order: Int
  # The display name for this option
  title: String
  # An object that defines a file value
  value: CustomizableFileValue
}

# CustomizableFileValue defines the price and sku of a product whose page contains a customized file picker
type CustomizableFileValue {
  # The file extension to accept
  file_extension: String
  # The maximum width of an image
  image_size_x: Int
  # The maximum height of an image
  image_size_y: Int
  # The price assigned to this option
  price: Float
  # FIXED, PERCENT, or DYNAMIC
  price_type: PriceTypeEnum
  # The Stock Keeping Unit for this option
  sku: String
}

# The CustomizableOptionInterface contains basic information about a customizable
# option. It can be implemented by several types of configurable options.
interface CustomizableOptionInterface {
  # Option ID
  option_id: Int
  # Indicates whether the option is required
  required: Boolean
  # The order in which the option is displayed
  sort_order: Int
  # The display name for this option
  title: String
}

# CustomizableProductInterface contains information about customizable product options.
interface CustomizableProductInterface {
  # An array of options for a customizable product
  options: [CustomizableOptionInterface]
}

# CustomizableRadioOption contains information about a set of radio buttons that are defined as part of a customizable option
type CustomizableRadioOption implements CustomizableOptionInterface {
  # Option ID
  option_id: Int
  # Indicates whether the option is required
  required: Boolean
  # The order in which the option is displayed
  sort_order: Int
  # The display name for this option
  title: String
  # An array that defines a set of radio buttons
  value: [CustomizableRadioValue]
}

# CustomizableRadioValue defines the price and sku of a product whose page contains a customized set of radio buttons
type CustomizableRadioValue {
  # The ID assigned to the value
  option_type_id: Int
  # The price assigned to this option
  price: Float
  # FIXED, PERCENT, or DYNAMIC
  price_type: PriceTypeEnum
  # The Stock Keeping Unit for this option
  sku: String
  # The order in which the radio button is displayed
  sort_order: Int
  # The display name for this option
  title: String
}

# This enumeration specifies whether a link or sample is a file or URL
enum DownloadableFileTypeEnum {
  FILE
  URL
}

# DownloadableProduct defines a product that the customer downloads
type DownloadableProduct implements ProductInterface & CustomizableProductInterface {
  # The attribute set assigned to the product
  attribute_set_id: Int
  # Canonical URL
  canonical_url: String
  # The categories assigned to a product
  categories: [CategoryInterface]
  color: Int
  # The product's country of origin
  country_of_manufacture: String
  # Timestamp indicating when the product was created
  created_at: String
  # Detailed information about the product. The value can include simple HTML tags.
  description: ComplexTextValue
  # An array containing information about the links for this downloadable product
  downloadable_product_links: [DownloadableProductLinks]
  # An array containing information about samples of this downloadable product.
  downloadable_product_samples: [DownloadableProductSamples]
  # Indicates whether a gift message is available
  gift_message_available: String
  # The ID number assigned to the product
  id: Int
  # The relative path to the main image on the product page
  image: ProductImage
  # A value of 1 indicates that each link in the array must be purchased separately
  links_purchased_separately: Int
  # The heading above the list of downloadable products
  links_title: String
  # A number representing the product's manufacturer
  manufacturer: Int
  # An array of MediaGalleryEntry objects
  media_gallery_entries: [MediaGalleryEntry]
  # A brief overview of the product for search results listings, maximum 255 characters
  meta_description: String
  # A comma-separated list of keywords that are visible only to search engines
  meta_keyword: String
  # A string that is displayed in the title bar and tab of the browser and in search results lists
  meta_title: String
  # The product name. Customers use this name to identify the product.
  name: String
  # The beginning date for new product listings, and determines if the product is featured as a new product
  new_from_date: String
  # The end date for new product listings
  new_to_date: String
  # Product stock only x left count
  only_x_left_in_stock: Float
  # An array of options for a customizable product
  options: [CustomizableOptionInterface]
  # If the product has multiple options, determines where they appear on the product page
  options_container: String
  # A ProductPrices object, indicating the price of an item
  price: ProductPrices
  # An array of ProductLinks objects
  product_links: [ProductLinksInterface]
  # A short description of the product. Its use depends on the theme.
  short_description: ComplexTextValue
  # A number or code assigned to a product to identify the product, options, price, and manufacturer
  sku: String
  # The relative path to the small image, which is used on catalog pages
  small_image: ProductImage
  # The beginning date that a product has a special price
  special_from_date: String
  # The discounted price of the product
  special_price: Float
  # The end date that a product has a special price
  special_to_date: String
  # Stock status of the product
  stock_status: ProductStockStatus
  # The file name of a swatch image
  swatch_image: String
  # The relative path to the product's thumbnail image
  thumbnail: ProductImage
  # The price when tier pricing is in effect and the items purchased threshold has been reached
  tier_price: Float
  # An array of ProductTierPrices objects
  tier_prices: [ProductTierPrices]
  # One of simple, virtual, bundle, downloadable, grouped, or configurable
  type_id: String
  # Timestamp indicating when the product was updated
  updated_at: String
  # The part of the URL that identifies the product
  url_key: String
  # The part of the URL that precedes the url_key
  url_path: String
  # URL rewrites list
  url_rewrites: [UrlRewrite]
  # An array of websites in which the product is available
  websites: [Website]
}

# DownloadableProductLinks defines characteristics of a downloadable product
type DownloadableProductLinks {
  # The unique ID for the link to the downloadable product
  id: Int
  # Indicates whether the link is shareable
  is_shareable: Boolean
  # Either FILE or URL
  link_type: DownloadableFileTypeEnum
  # The maximum number of times the product can be downloaded. A value of 0 means unlimited.
  number_of_downloads: Int
  # The price of the downloadable product
  price: Float
  # The relative path to the downloadable sample
  sample_file: String
  # Either FILE or URL
  sample_type: DownloadableFileTypeEnum
  # The relative URL to the downloadable sample
  sample_url: String
  # A number indicating the sort order
  sort_order: Int
  # The display name of the link
  title: String
}

# DownloadableProductSamples defines characteristics of a downloadable product
type DownloadableProductSamples {
  # The unique ID for the downloadable product sample
  id: Int
  # The relative path to the downloadable sample
  sample_file: String
  # Either FILE or URL
  sample_type: DownloadableFileTypeEnum
  # The relative URL to the downloadable sample
  sample_url: String
  # A number indicating the sort order
  sort_order: Int
  # The display name of the sample
  title: String
}

# EntityUrl is an output object containing the id, canonical_url, and type attributes
type EntityUrl {
  # The internal relative URL. If the specified  url is a redirect, the query returns the redirected URL, not the original.
  canonical_url: String
  # The ID assigned to the object associated with the specified url. This could be a product ID, category ID, or page ID.
  id: Int
  # One of PRODUCT, CATEGORY, or CMS_PAGE.
  type: UrlRewriteEntityTypeEnum
}

type ExchangeRate {
  currency_to: String
  rate: Float
}

# FilterTypeInput specifies which action will be performed in a query
input FilterTypeInput {
  # Equals
  eq: String
  # Find in set. The value can contain a set of comma-separated values
  finset: [String]
  # From. Must be used with 'to'
  from: String
  # Greater than
  gt: String
  # Greater than or equal to
  gteq: String
  # In. The value can contain a set of comma-separated values
  in: [String]
  # Like. The specified value can contain % (percent signs) to allow matching of 0 or more characters
  like: String
  # Less than
  lt: String
  # Less than or equal to
  lteq: String
  # More than or equal to
  moreq: String
  # Not equal to
  neq: String
  # Not in. The value can contain a set of comma-separated values
  nin: [String]
  # Not null
  notnull: String
  # Is null
  null: String
  # To. Must be used with 'from'
  to: String
}

# GroupedProduct defines a grouped product
type GroupedProduct implements ProductInterface & PhysicalProductInterface {
  # The attribute set assigned to the product
  attribute_set_id: Int
  # Canonical URL
  canonical_url: String
  # The categories assigned to a product
  categories: [CategoryInterface]
  color: Int
  # The product's country of origin
  country_of_manufacture: String
  # Timestamp indicating when the product was created
  created_at: String
  # Detailed information about the product. The value can include simple HTML tags.
  description: ComplexTextValue
  # Indicates whether a gift message is available
  gift_message_available: String
  # The ID number assigned to the product
  id: Int
  # The relative path to the main image on the product page
  image: ProductImage
  # An array containing grouped product items
  items: [GroupedProductItem]
  # A number representing the product's manufacturer
  manufacturer: Int
  # An array of MediaGalleryEntry objects
  media_gallery_entries: [MediaGalleryEntry]
  # A brief overview of the product for search results listings, maximum 255 characters
  meta_description: String
  # A comma-separated list of keywords that are visible only to search engines
  meta_keyword: String
  # A string that is displayed in the title bar and tab of the browser and in search results lists
  meta_title: String
  # The product name. Customers use this name to identify the product.
  name: String
  # The beginning date for new product listings, and determines if the product is featured as a new product
  new_from_date: String
  # The end date for new product listings
  new_to_date: String
  # Product stock only x left count
  only_x_left_in_stock: Float
  # If the product has multiple options, determines where they appear on the product page
  options_container: String
  # A ProductPrices object, indicating the price of an item
  price: ProductPrices
  # An array of ProductLinks objects
  product_links: [ProductLinksInterface]
  # A short description of the product. Its use depends on the theme.
  short_description: ComplexTextValue
  # A number or code assigned to a product to identify the product, options, price, and manufacturer
  sku: String
  # The relative path to the small image, which is used on catalog pages
  small_image: ProductImage
  # The beginning date that a product has a special price
  special_from_date: String
  # The discounted price of the product
  special_price: Float
  # The end date that a product has a special price
  special_to_date: String
  # Stock status of the product
  stock_status: ProductStockStatus
  # The file name of a swatch image
  swatch_image: String
  # The relative path to the product's thumbnail image
  thumbnail: ProductImage
  # The price when tier pricing is in effect and the items purchased threshold has been reached
  tier_price: Float
  # An array of ProductTierPrices objects
  tier_prices: [ProductTierPrices]
  # One of simple, virtual, bundle, downloadable, grouped, or configurable
  type_id: String
  # Timestamp indicating when the product was updated
  updated_at: String
  # The part of the URL that identifies the product
  url_key: String
  # The part of the URL that precedes the url_key
  url_path: String
  # URL rewrites list
  url_rewrites: [UrlRewrite]
  # An array of websites in which the product is available
  websites: [Website]
  # The weight of the item, in units defined by the store
  weight: Float
}

# GroupedProductItem contains information about an individual grouped product item
type GroupedProductItem {
  # The relative position of this item compared to the other group items
  position: Int
  # The ProductInterface object, which contains details about this product option
  product: ProductInterface
  # The quantity of this grouped product item
  qty: Float
}

# The object details of target path parameters
type HttpQueryParameter {
  # Parameter name
  name: String
  # Parameter value
  value: String
}

type LayerFilter {
  # Array of filter items
  filter_items: [LayerFilterItemInterface]
  # Count of filter items in filter group
  filter_items_count: Int
  # Layered navigation filter name
  name: String
  # Request variable name for filter query
  request_var: String
}

type LayerFilterItem implements LayerFilterItemInterface {
  # Count of items by filter
  items_count: Int
  # Filter label
  label: String
  # Value for filter request variable to be used in query
  value_string: String
}

interface LayerFilterItemInterface {
  # Count of items by filter
  items_count: Int
  # Filter label
  label: String
  # Value for filter request variable to be used in query
  value_string: String
}

# MediaGalleryEntry defines characteristics about images and videos associated with a specific product
type MediaGalleryEntry {
  # Contains a ProductMediaGalleryEntriesContent object
  content: ProductMediaGalleryEntriesContent
  # Whether the image is hidden from vie
  disabled: Boolean
  # The path of the image on the server
  file: String
  # The identifier assigned to the object
  id: Int
  # The alt text displayed on the UI when the user points to the image
  label: String
  # image or video
  media_type: String
  # The media item's position after it has been sorted
  position: Int
  # Array of image types. It can have the following values: image, small_image, thumbnail
  types: [String]
  # Contains a ProductMediaGalleryEntriesVideoContent object
  video_content: ProductMediaGalleryEntriesVideoContent
}

# A Money object defines a monetary value, including a numeric value and a currency code.
type Money {
  # A three-letter currency code, such as USD or EUR
  currency: CurrencyEnum
  # A number expressing a monetary value
  value: Float
}

type Mutation {
  # Changes the password for the logged-in customer
  changeCustomerPassword(
    currentPassword: String!
    newPassword: String!
  ): Customer
  # Create customer account
  createCustomer(input: CustomerInput!): CustomerOutput
  # Create customer address
  createCustomerAddress(input: CustomerAddressInput!): CustomerAddress
  # Creates empty shopping cart for guest or logged in user
  createEmptyCart: String
  # Delete customer address
  deleteCustomerAddress(id: Int!): Boolean
  # Retrieve the customer token
  generateCustomerToken(email: String!, password: String!): CustomerToken
  # Revoke the customer token
  revokeCustomerToken: RevokeCustomerTokenOutput
  # Recommends Product by Sending Single/Multiple Email
  sendEmailToFriend(input: SendEmailToFriendInput): SendEmailToFriendOutput
  # Update the customer's personal information
  updateCustomer(input: CustomerInput!): CustomerOutput
  # Update customer address
  updateCustomerAddress(id: Int!, input: CustomerAddressInput): CustomerAddress
}

# PhysicalProductInterface contains attributes specific to tangible products
interface PhysicalProductInterface {
  # The weight of the item, in units defined by the store
  weight: Float
}

# The Price object defines the price of a product as well as any tax-related adjustments.
type Price {
  # An array that provides information about tax, weee, or weee_tax adjustments
  adjustments: [PriceAdjustment]
  # The price of a product plus a three-letter currency code
  amount: Money
}

# The PricedAdjustment object defines the amount of money to apply as an
# adjustment, the type of adjustment to apply, and whether the item is included or
# excluded from the adjustment.
type PriceAdjustment {
  # The amount of the price adjustment and its currency code
  amount: Money
  # Indicates whether the adjustment involves tax, weee, or weee_tax
  code: PriceAdjustmentCodesEnum
  # Indicates whether the entity described by the code attribute is included or excluded from the adjustment
  description: PriceAdjustmentDescriptionEnum
}

# Note: This enumeration contains values defined in modules other than the Catalog module.
enum PriceAdjustmentCodesEnum {
  TAX
  WEE
  WEETAX
}

# This enumeration states whether a price adjustment is included or excluded.
enum PriceAdjustmentDescriptionEnum {
  INCLUDED
  EXCLUDED
}

# This enumeration the price type.
enum PriceTypeEnum {
  FIXED
  PERCENT
  DYNAMIC
}

# This enumeration defines whether a bundle product's price is displayed as the lowest possible value or as a range.
enum PriceViewEnum {
  PRICE_RANGE
  AS_LOW_AS
}

# ProductFilterInput defines the filters to be used in the search. A filter
# contains at least one attribute, a comparison operator, and the value that is
# being searched for.
input ProductFilterInput {
  # Category ID the product belongs to
  category_id: FilterTypeInput
  # The product's country of origin
  country_of_manufacture: FilterTypeInput
  # Timestamp indicating when the product was created
  created_at: FilterTypeInput
  # The name of a custom layout
  custom_layout: FilterTypeInput
  # XML code that is applied as a layout update to the product page
  custom_layout_update: FilterTypeInput
  # Detailed information about the product. The value can include simple HTML tags.
  description: FilterTypeInput
  # Indicates whether a gift message is available
  gift_message_available: FilterTypeInput
  # Indicates whether additional attributes have been created for the product
  has_options: FilterTypeInput
  # The relative path to the main image on the product page
  image: FilterTypeInput
  # The label assigned to a product image
  image_label: FilterTypeInput
  # A number representing the product's manufacturer
  manufacturer: FilterTypeInput
  # The numeric maximal price of the product. Do not include the currency code.
  max_price: FilterTypeInput
  # A brief overview of the product for search results listings, maximum 255 characters
  meta_description: FilterTypeInput
  # A comma-separated list of keywords that are visible only to search engines
  meta_keyword: FilterTypeInput
  # A string that is displayed in the title bar and tab of the browser and in search results lists
  meta_title: FilterTypeInput
  # The numeric minimal price of the product. Do not include the currency code.
  min_price: FilterTypeInput
  # The product name. Customers use this name to identify the product.
  name: FilterTypeInput
  # The beginning date for new product listings, and determines if the product is featured as a new product
  news_from_date: FilterTypeInput
  # The end date for new product listings
  news_to_date: FilterTypeInput
  # If the product has multiple options, determines where they appear on the product page
  options_container: FilterTypeInput
  # The keyword required to perform a logical OR comparison
  or: ProductFilterInput
  # The price of an item
  price: FilterTypeInput
  # Indicates whether the product has required options
  required_options: FilterTypeInput
  # A short description of the product. Its use depends on the theme.
  short_description: FilterTypeInput
  # A number or code assigned to a product to identify the product, options, price, and manufacturer
  sku: FilterTypeInput
  # The relative path to the small image, which is used on catalog pages
  small_image: FilterTypeInput
  # The label assigned to a product's small image
  small_image_label: FilterTypeInput
  # The beginning date that a product has a special price
  special_from_date: FilterTypeInput
  # The numeric special price of the product. Do not include the currency code.
  special_price: FilterTypeInput
  # The end date that a product has a special price
  special_to_date: FilterTypeInput
  # The file name of a swatch image
  swatch_image: FilterTypeInput
  # The relative path to the product's thumbnail image
  thumbnail: FilterTypeInput
  # The label assigned to a product's thumbnail image
  thumbnail_label: FilterTypeInput
  # The price when tier pricing is in effect and the items purchased threshold has been reached
  tier_price: FilterTypeInput
  # Timestamp indicating when the product was updated
  updated_at: FilterTypeInput
  # The part of the URL that identifies the product
  url_key: FilterTypeInput
  # The part of the URL that precedes the url_key
  url_path: FilterTypeInput
  # The weight of the item, in units defined by the store
  weight: FilterTypeInput
}

# Product image information. Contains image relative path, URL and label
type ProductImage {
  label: String
  url: String
}

# The ProductInterface contains attributes that are common to all types of
# products. Note that descriptions may not be available for custom and EAV attributes.
interface ProductInterface {
  # The attribute set assigned to the product
  attribute_set_id: Int
  # Canonical URL
  canonical_url: String
  # The categories assigned to a product
  categories: [CategoryInterface]
  color: Int
  # The product's country of origin
  country_of_manufacture: String
  # Timestamp indicating when the product was created
  created_at: String
  # Detailed information about the product. The value can include simple HTML tags.
  description: ComplexTextValue
  # Indicates whether a gift message is available
  gift_message_available: String
  # The ID number assigned to the product
  id: Int
  # The relative path to the main image on the product page
  image: ProductImage
  # A number representing the product's manufacturer
  manufacturer: Int
  # An array of MediaGalleryEntry objects
  media_gallery_entries: [MediaGalleryEntry]
  # A brief overview of the product for search results listings, maximum 255 characters
  meta_description: String
  # A comma-separated list of keywords that are visible only to search engines
  meta_keyword: String
  # A string that is displayed in the title bar and tab of the browser and in search results lists
  meta_title: String
  # The product name. Customers use this name to identify the product.
  name: String
  # The beginning date for new product listings, and determines if the product is featured as a new product
  new_from_date: String
  # The end date for new product listings
  new_to_date: String
  # Product stock only x left count
  only_x_left_in_stock: Float
  # If the product has multiple options, determines where they appear on the product page
  options_container: String
  # A ProductPrices object, indicating the price of an item
  price: ProductPrices
  # An array of ProductLinks objects
  product_links: [ProductLinksInterface]
  # A short description of the product. Its use depends on the theme.
  short_description: ComplexTextValue
  # A number or code assigned to a product to identify the product, options, price, and manufacturer
  sku: String
  # The relative path to the small image, which is used on catalog pages
  small_image: ProductImage
  # The beginning date that a product has a special price
  special_from_date: String
  # The discounted price of the product
  special_price: Float
  # The end date that a product has a special price
  special_to_date: String
  # Stock status of the product
  stock_status: ProductStockStatus
  # The file name of a swatch image
  swatch_image: String
  # The relative path to the product's thumbnail image
  thumbnail: ProductImage
  # The price when tier pricing is in effect and the items purchased threshold has been reached
  tier_price: Float
  # An array of ProductTierPrices objects
  tier_prices: [ProductTierPrices]
  # One of simple, virtual, bundle, downloadable, grouped, or configurable
  type_id: String
  # Timestamp indicating when the product was updated
  updated_at: String
  # The part of the URL that identifies the product
  url_key: String
  # The part of the URL that precedes the url_key
  url_path: String
  # URL rewrites list
  url_rewrites: [UrlRewrite]
  # An array of websites in which the product is available
  websites: [Website]
}

# ProductLinks is an implementation of ProductLinksInterface.
type ProductLinks implements ProductLinksInterface {
  # One of related, associated, upsell, or crosssell
  link_type: String
  # The SKU of the linked product
  linked_product_sku: String
  # The type of linked product (simple, virtual, bundle, downloadable, grouped, configurable)
  linked_product_type: String
  # The position within the list of product links
  position: Int
  # The identifier of the linked product
  sku: String
}

# ProductLinks contains information about linked products, including the link type and product type of each item.
interface ProductLinksInterface {
  # One of related, associated, upsell, or crosssell
  link_type: String
  # The SKU of the linked product
  linked_product_sku: String
  # The type of linked product (simple, virtual, bundle, downloadable, grouped, configurable)
  linked_product_type: String
  # The position within the list of product links
  position: Int
  # The identifier of the linked product
  sku: String
}

# ProductMediaGalleryEntriesContent contains an image in base64 format and basic information about the image
type ProductMediaGalleryEntriesContent {
  # The image in base64 format
  base64_encoded_data: String
  # The file name of the image
  name: String
  # The MIME type of the file, such as image/png
  type: String
}

# ProductMediaGalleryEntriesVideoContent contains a link to a video file and basic information about the video
type ProductMediaGalleryEntriesVideoContent {
  # Must be external-video
  media_type: String
  # A description of the video
  video_description: String
  # Optional data about the video
  video_metadata: String
  # Describes the video source
  video_provider: String
  # The title of the video
  video_title: String
  # The URL to the video
  video_url: String
}

# The ProductPrices object contains the regular price of an item, as well as its
# minimum and maximum prices. Only composite products, which include bundle,
# configurable, and grouped products, can contain a minimum and maximum price.
type ProductPrices {
  # The highest possible final price for all the options defined within a
  # composite product. If you are specifying a price range, this would be the to value.
  maximalPrice: Price
  # The lowest possible final price for all the options defined within a composite
  # product. If you are specifying a price range, this would be the from value.
  minimalPrice: Price
  # The base price of a product.
  regularPrice: Price
}

# The Products object is the top-level object returned in a product search
type Products {
  # Layered navigation filters array
  filters: [LayerFilter]
  # An array of products that match the specified search criteria
  items: [ProductInterface]
  # An object that includes the page_info and currentPage values specified in the query
  page_info: SearchResultPageInfo
  # An object that includes the default sort field and all available sort fields
  sort_fields: SortFields
  # The number of products returned
  total_count: Int
}

# ProductSortInput specifies the attribute to use for sorting search results and
# indicates whether the results are sorted in ascending or descending order
input ProductSortInput {
  # The product's country of origin
  country_of_manufacture: SortEnum
  # Timestamp indicating when the product was created
  created_at: SortEnum
  # The name of a custom layout
  custom_layout: SortEnum
  # XML code that is applied as a layout update to the product page
  custom_layout_update: SortEnum
  # Detailed information about the product. The value can include simple HTML tags.
  description: SortEnum
  # Indicates whether a gift message is available
  gift_message_available: SortEnum
  # Indicates whether additional attributes have been created for the product
  has_options: SortEnum
  # The relative path to the main image on the product page
  image: SortEnum
  # The label assigned to a product image
  image_label: SortEnum
  # A number representing the product's manufacturer
  manufacturer: SortEnum
  # A brief overview of the product for search results listings, maximum 255 characters
  meta_description: SortEnum
  # A comma-separated list of keywords that are visible only to search engines
  meta_keyword: SortEnum
  # A string that is displayed in the title bar and tab of the browser and in search results lists
  meta_title: SortEnum
  # The product name. Customers use this name to identify the product.
  name: SortEnum
  # The beginning date for new product listings, and determines if the product is featured as a new product
  news_from_date: SortEnum
  # The end date for new product listings
  news_to_date: SortEnum
  # If the product has multiple options, determines where they appear on the product page
  options_container: SortEnum
  # The price of the item
  price: SortEnum
  # Indicates whether the product has required options
  required_options: SortEnum
  # A short description of the product. Its use depends on the theme.
  short_description: SortEnum
  # A number or code assigned to a product to identify the product, options, price, and manufacturer
  sku: SortEnum
  # The relative path to the small image, which is used on catalog pages
  small_image: SortEnum
  # The label assigned to a product's small image
  small_image_label: SortEnum
  # The beginning date that a product has a special price
  special_from_date: SortEnum
  # The discounted price of the product
  special_price: SortEnum
  # The end date that a product has a special price
  special_to_date: SortEnum
  # The file name of a swatch image
  swatch_image: SortEnum
  # The relative path to the product's thumbnail image
  thumbnail: SortEnum
  # The label assigned to a product's thumbnail image
  thumbnail_label: SortEnum
  # The price when tier pricing is in effect and the items purchased threshold has been reached
  tier_price: SortEnum
  # Timestamp indicating when the product was updated
  updated_at: SortEnum
  # The part of the URL that identifies the product
  url_key: SortEnum
  # The part of the URL that precedes the url_key
  url_path: SortEnum
  # The weight of the item, in units defined by the store
  weight: SortEnum
}

# This enumeration states whether a product stock status is in stock or out of stock
enum ProductStockStatus {
  IN_STOCK
  OUT_OF_STOCK
}

# The ProductTierPrices object defines a tier price, which is a quantity discount offered to a specific customer group.
type ProductTierPrices {
  # The ID of the customer group
  customer_group_id: String
  # The percentage discount of the item
  percentage_value: Float
  # The number of items that must be purchased to qualify for tier pricing
  qty: Float
  # The price of the fixed price item
  value: Float
  # The ID assigned to the website
  website_id: Float
}

extend type Query {
  category(
    # Id of the category
    id: Int
  ): CategoryTree
  # The CMS block query returns information about CMS blocks
  cmsBlocks(
    # Identifiers of the CMS blocks
    identifiers: [String]
  ): CmsBlocks
  # The CMS page query returns information about a CMS page
  cmsPage(
    # Id of the CMS page
    id: Int
  ): CmsPage
  # The countries query provides information for all countries.
  countries: [Country]
  # The countries query provides information for a single country.
  country(id: String): Country
  # The currency query returns information about store currency.
  currency: Currency
  # The customAttributeMetadata query returns the attribute type, given an attribute code and entity type
  customAttributeMetadata(
    attributes: [AttributeInput!]!
  ): CustomAttributeMetadata
  # The customer query returns information about a customer account
  customer: Customer
  # The query returns the contents of a customer's downloadable products
  customerDownloadableProducts: CustomerDownloadableProducts
  # List of customer orders
  customerOrders: CustomerOrders
  # The products query searches for products that match the criteria specified in the search and filter attributes
  products(
    # Performs a full-text search using the specified key words.
    search: String
    # Identifies which product attributes to search for and return.
    filter: ProductFilterInput
    # Specifies the maximum number of results to return at once. This attribute is optional.
    pageSize: Int = 20
    # Specifies which page of results to return. The default value is 1.
    currentPage: Int = 1
    # Specifies which attribute to sort on, and whether to return the results in ascending or descending order.
    sort: ProductSortInput
  ): Products
  # The store config query
  storeConfig: StoreConfig
  # The urlResolver query returns the relative URL for a specified product, category or CMS page
  urlResolver(url: String!): EntityUrl
  # The wishlist query returns the contents of a customer's wish list
  wishlist: WishlistOutput
}

type Region {
  code: String
  id: Int
  name: String
}

type RevokeCustomerTokenOutput {
  result: Boolean!
}

# SearchResultPageInfo provides navigation for the query response
type SearchResultPageInfo {
  # Specifies which page of results to return
  current_page: Int
  # Specifies the maximum number of items to return
  page_size: Int
  # Total pages
  total_pages: Int
}

input SendEmailToFriendInput {
  product_id: Int!
  recipients: [SendEmailToFriendRecipientInput]!
  sender: SendEmailToFriendSenderInput!
}

type SendEmailToFriendOutput {
  recipients: [SendEmailToFriendRecipient]
  sender: SendEmailToFriendSender
}

type SendEmailToFriendRecipient {
  email: String!
  name: String!
}

input SendEmailToFriendRecipientInput {
  email: String!
  name: String!
}

type SendEmailToFriendSender {
  email: String!
  message: String!
  name: String!
}

input SendEmailToFriendSenderInput {
  email: String!
  message: String!
  name: String!
}

# This enumeration defines whether bundle items must be shipped together.
enum ShipBundleItemsEnum {
  TOGETHER
  SEPARATELY
}

# A simple product is tangible and are usually sold as single units or in fixed quantities
type SimpleProduct implements ProductInterface & PhysicalProductInterface & CustomizableProductInterface {
  # The attribute set assigned to the product
  attribute_set_id: Int
  # Canonical URL
  canonical_url: String
  # The categories assigned to a product
  categories: [CategoryInterface]
  color: Int
  # The product's country of origin
  country_of_manufacture: String
  # Timestamp indicating when the product was created
  created_at: String
  # Detailed information about the product. The value can include simple HTML tags.
  description: ComplexTextValue
  # Indicates whether a gift message is available
  gift_message_available: String
  # The ID number assigned to the product
  id: Int
  # The relative path to the main image on the product page
  image: ProductImage
  # A number representing the product's manufacturer
  manufacturer: Int
  # An array of MediaGalleryEntry objects
  media_gallery_entries: [MediaGalleryEntry]
  # A brief overview of the product for search results listings, maximum 255 characters
  meta_description: String
  # A comma-separated list of keywords that are visible only to search engines
  meta_keyword: String
  # A string that is displayed in the title bar and tab of the browser and in search results lists
  meta_title: String
  # The product name. Customers use this name to identify the product.
  name: String
  # The beginning date for new product listings, and determines if the product is featured as a new product
  new_from_date: String
  # The end date for new product listings
  new_to_date: String
  # Product stock only x left count
  only_x_left_in_stock: Float
  # An array of options for a customizable product
  options: [CustomizableOptionInterface]
  # If the product has multiple options, determines where they appear on the product page
  options_container: String
  # A ProductPrices object, indicating the price of an item
  price: ProductPrices
  # An array of ProductLinks objects
  product_links: [ProductLinksInterface]
  # A short description of the product. Its use depends on the theme.
  short_description: ComplexTextValue
  # A number or code assigned to a product to identify the product, options, price, and manufacturer
  sku: String
  # The relative path to the small image, which is used on catalog pages
  small_image: ProductImage
  # The beginning date that a product has a special price
  special_from_date: String
  # The discounted price of the product
  special_price: Float
  # The end date that a product has a special price
  special_to_date: String
  # Stock status of the product
  stock_status: ProductStockStatus
  # The file name of a swatch image
  swatch_image: String
  # The relative path to the product's thumbnail image
  thumbnail: ProductImage
  # The price when tier pricing is in effect and the items purchased threshold has been reached
  tier_price: Float
  # An array of ProductTierPrices objects
  tier_prices: [ProductTierPrices]
  # One of simple, virtual, bundle, downloadable, grouped, or configurable
  type_id: String
  # Timestamp indicating when the product was updated
  updated_at: String
  # The part of the URL that identifies the product
  url_key: String
  # The part of the URL that precedes the url_key
  url_path: String
  # URL rewrites list
  url_rewrites: [UrlRewrite]
  # An array of websites in which the product is available
  websites: [Website]
  # The weight of the item, in units defined by the store
  weight: Float
}

# This enumeration indicates whether to return results in ascending or descending order
enum SortEnum {
  ASC
  DESC
}

type SortField {
  # Label of sort field
  label: String
  # Attribute code of sort field
  value: String
}

# SortFields contains a default value for sort fields and all available sort fields
type SortFields {
  # Default value of sort fields
  default: String
  # Available sort fields
  options: [SortField]
}

# The type contains information about a store config
type StoreConfig {
  # Footer Miscellaneous HTML
  absolute_footer: String
  # Base currency code
  base_currency_code: String
  # Base link URL for the store
  base_link_url: String
  # Base media URL for the store
  base_media_url: String
  # Base static URL for the store
  base_static_url: String
  # Base URL for the store
  base_url: String
  # CMS Home Page
  cms_home_page: String
  # CMS No Cookies Page
  cms_no_cookies: String
  # CMS No Route Page
  cms_no_route: String
  # A code assigned to the store to identify it
  code: String
  # Copyright
  copyright: String
  # Default Meta Description
  default_description: String
  # Default display currency code
  default_display_currency_code: String
  # Default Meta Keywords
  default_keywords: String
  # Default Page Title
  default_title: String
  # Display Demo Store Notice
  demonotice: Int
  # Default Web URL
  front: String
  # Scripts and Style Sheets
  head_includes: String
  # Favicon Icon
  head_shortcut_icon: String
  # Logo Image
  header_logo_src: String
  # The ID number assigned to the store
  id: Int
  # Store locale
  locale: String
  # Logo Image Alt
  logo_alt: String
  # Logo Attribute Height
  logo_height: Int
  # Logo Attribute Width
  logo_width: Int
  # Default No-route URL
  no_route: String
  # Secure base link URL for the store
  secure_base_link_url: String
  # Secure base media URL for the store
  secure_base_media_url: String
  # Secure base static URL for the store
  secure_base_static_url: String
  # Secure base URL for the store
  secure_base_url: String
  # Show Breadcrumbs for CMS Pages
  show_cms_breadcrumbs: Int
  # Timezone of the store
  timezone: String
  # Page Title Prefix
  title_prefix: String
  # Page Title Suffix
  title_suffix: String
  # The ID number assigned to the website store belongs
  website_id: Int
  # The unit of weight
  weight_unit: String
  # Welcome Text
  welcome: String
}

type SwatchData {
  # Type of swatch filter item: 1 - text, 2 - image
  type: String
  # Value for swatch item (text or image link)
  value: String
}

type SwatchLayerFilterItem implements LayerFilterItemInterface & SwatchLayerFilterItemInterface {
  # Count of items by filter
  items_count: Int
  # Filter label
  label: String
  # Data required to render swatch filter item
  swatch_data: SwatchData
  # Value for filter request variable to be used in query
  value_string: String
}

interface SwatchLayerFilterItemInterface {
  # Data required to render swatch filter item
  swatch_data: SwatchData
}

# The object contains URL rewrite details
type UrlRewrite {
  # Request parameters
  parameters: [HttpQueryParameter]
  # Request URL
  url: String
}

# This enumeration defines the entity type.
enum UrlRewriteEntityTypeEnum {
  CMS_PAGE
  PRODUCT
  CATEGORY
}

# A virtual product is non-tangible product that does not require shipping and is not kept in inventory
type VirtualProduct implements ProductInterface & CustomizableProductInterface {
  # The attribute set assigned to the product
  attribute_set_id: Int
  # Canonical URL
  canonical_url: String
  # The categories assigned to a product
  categories: [CategoryInterface]
  color: Int
  # The product's country of origin
  country_of_manufacture: String
  # Timestamp indicating when the product was created
  created_at: String
  # Detailed information about the product. The value can include simple HTML tags.
  description: ComplexTextValue
  # Indicates whether a gift message is available
  gift_message_available: String
  # The ID number assigned to the product
  id: Int
  # The relative path to the main image on the product page
  image: ProductImage
  # A number representing the product's manufacturer
  manufacturer: Int
  # An array of MediaGalleryEntry objects
  media_gallery_entries: [MediaGalleryEntry]
  # A brief overview of the product for search results listings, maximum 255 characters
  meta_description: String
  # A comma-separated list of keywords that are visible only to search engines
  meta_keyword: String
  # A string that is displayed in the title bar and tab of the browser and in search results lists
  meta_title: String
  # The product name. Customers use this name to identify the product.
  name: String
  # The beginning date for new product listings, and determines if the product is featured as a new product
  new_from_date: String
  # The end date for new product listings
  new_to_date: String
  # Product stock only x left count
  only_x_left_in_stock: Float
  # An array of options for a customizable product
  options: [CustomizableOptionInterface]
  # If the product has multiple options, determines where they appear on the product page
  options_container: String
  # A ProductPrices object, indicating the price of an item
  price: ProductPrices
  # An array of ProductLinks objects
  product_links: [ProductLinksInterface]
  # A short description of the product. Its use depends on the theme.
  short_description: ComplexTextValue
  # A number or code assigned to a product to identify the product, options, price, and manufacturer
  sku: String
  # The relative path to the small image, which is used on catalog pages
  small_image: ProductImage
  # The beginning date that a product has a special price
  special_from_date: String
  # The discounted price of the product
  special_price: Float
  # The end date that a product has a special price
  special_to_date: String
  # Stock status of the product
  stock_status: ProductStockStatus
  # The file name of a swatch image
  swatch_image: String
  # The relative path to the product's thumbnail image
  thumbnail: ProductImage
  # The price when tier pricing is in effect and the items purchased threshold has been reached
  tier_price: Float
  # An array of ProductTierPrices objects
  tier_prices: [ProductTierPrices]
  # One of simple, virtual, bundle, downloadable, grouped, or configurable
  type_id: String
  # Timestamp indicating when the product was updated
  updated_at: String
  # The part of the URL that identifies the product
  url_key: String
  # The part of the URL that precedes the url_key
  url_path: String
  # URL rewrites list
  url_rewrites: [UrlRewrite]
  # An array of websites in which the product is available
  websites: [Website]
}

# The type contains information about a website
type Website {
  # A code assigned to the website to identify it
  code: String
  # The default group ID that the website has
  default_group_id: String
  # The ID number assigned to the website
  id: Int
  # Specifies if this is the default website
  is_default: Boolean
  # The website name. Websites use this name to identify it easier.
  name: String
  # The attribute to use for sorting websites
  sort_order: Int
}

type WishlistItem {
  # The time when the customer added the item to the wish list
  added_at: String
  # The customer's comment about this item
  description: String
  # The wish list item ID
  id: Int
  product: ProductInterface
  # The quantity of this wish list item
  qty: Float
}

type WishlistOutput {
  # An array of items in the customer's wish list
  items: [WishlistItem]
  # The number of items in the wish list
  items_count: Int
  # When multiple wish lists are enabled, the name the customer assigns to the wishlist
  name: String
  # An encrypted code that Magento uses to link to the wish list
  sharing_code: String
  # The time of the last modification to the wish list
  updated_at: String
}
`