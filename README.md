# Motimize :clamp:

Motimize is an open source self-hosted REST web service to optimize and compress images.

## Why? :point_up:
Optimization and compression images is an important part of web development process. On many websites, images are the majority of data transferred to fetch a web page. Image optimization and compression is the easy way to make your website faster.

There are many open-sourced tools for like [ImageOptim](https://imageoptim.com/pl) but they are mostly designed to work locally on your machine. When you provide CMS to your client you do not control if uploaded images are optimized. Motimize aim to solve this problem by providing web service which you can integrate with any software.

Motimize need server infrastructure with node.js to work. Happily Heroku offer [free plan](https://www.heroku.com/pricing) which works perfectly with Motimize. Additionally, we have created the "Deploy to Heroku" button to launch Motimize instantly without hassle. You can host your own image optimization and compression web service instantly and without any cost!

## Installation :rocket:
The easiest way to install Motimize is to deploy it to Heroku using the button below.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/motivast/motimize-heroku)

Just click the button and follow instruction on the Heroku website.

## Usage :fire:

To optimize image using Motimize you have to send a POST request with the image you want to process to optimize endpoint:

```sh
curl -X POST \
  {{url}}/optimize \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "url",
    "image": "https://via.placeholder.com/1000x1000.jpg",
    "wait": "true"
}'
```
Where `{{url}}` is URL of your Motimize instance. In responce you should get `image` resource with simlar JSON:

```json
{
    "success": true,
    "id": "4979c7ab-7209-466f-adc4-0ecd5215efc2",
    "filename": "1000x1000.jpg",
    "mime_type": "image/jpeg",
    "size": 20242,
    "optimized": true,
    "optimized_size": 10335
}
```

Now you can download the optimized image:
```sh
curl -X GET \
  '{{url}}/image/4979c7ab-7209-466f-adc4-0ecd5215efc2/download?which=optimized' \
  -H 'Cache-Control: no-cache'
```
In response, you should get the image file.

You can check out our [Postman collection](https://github.com/motivast/motimize-postman) to find out more available endpoints and examples.

## Alternatives
* [Thumbor](https://github.com/thumbor/thumbor)
* [Imageflow](https://github.com/imazen/imageflow)
* [Kraken](https://kraken.io/)
* [ShortPixel](https://shortpixel.com/)
* [Imagify](https://imagify.io/)
* [EWWW Image Optimizer](https://ewww.io/)
* [WP Compress](https://wpcompress.com/)

## Contribute :hand:
Please make sure to read the [Contribution guide](https://github.com/motivast/motimize/blob/master/CONTRIBUTING.md) before making a pull request.

Thank you to all the people who already contributed to Polylang String Extractor!

## License :book:
The project is licensed under the [MIT](https://github.com/motivast/motimize/blob/master/LICENSE).

Copyright (c) 2018-present, Motivast
