# Ecommerce-Web-Application

I finished one Angular course from Udemy, and with all knowledge I gained, I made an application for E-Commerce. 
This application has different functionality that you find in a real online shop.

**The app is not finished yet, so it's more like a prototype.**

## What I learned?
I learned a lot about how to use Angular for the frontend and its functionalities: work with components, services.

## Technologies
Angular for frontend, Java + Spring Boot for backen and MySql for database management.

## Functionalities & Some Photos

This is the start page with products arranged in categories
![1](https://user-images.githubusercontent.com/68736035/110445810-2c98f100-80c7-11eb-9b9e-29f79c390ae6.png)

App has pagination functionality. User can also change the number of product for a page.
![2](https://user-images.githubusercontent.com/68736035/110445890-43d7de80-80c7-11eb-853a-2e7bf0daf49d.png)

Search method by a key.
![3](https://user-images.githubusercontent.com/68736035/110446329-b779eb80-80c7-11eb-8440-81634668301a.png)

User can adding item to the cart with **Add to cart** button. The cart status will update the price and number of products.
![4](https://user-images.githubusercontent.com/68736035/110446481-e2fcd600-80c7-11eb-830b-1eb6ac963bd0.png)

This is the cart-status component. It has a button to increase or decrease the number or remove each products.
![5](https://user-images.githubusercontent.com/68736035/110446819-4129b900-80c8-11eb-99f5-f7716c814992.png)

The checkout button from cart-status will move on with the checkout component. There will be some Reactive Forms such as **Customer**, **Shipping Address**, **Billing Address** and **Credit card**.
Some fields are required and more than that Email field must be a valid format (implemented with regex).
![6](https://user-images.githubusercontent.com/68736035/110447282-be552e00-80c8-11eb-88c6-0d4e2364b143.png)

Country and state fields are independent fields. User cannot select a state from another country than the selected one.
![7](https://user-images.githubusercontent.com/68736035/110448081-8a2e3d00-80c9-11eb-8489-e1561fefa3ee.png)

Here user can check the button for the same addresses for **Shipping** and **Billing**
![8](https://user-images.githubusercontent.com/68736035/110448704-180a2800-80ca-11eb-993a-11908aaaa085.png)

In the **Credit Card** form when the current year is selected, in Expiration Month will appear just the remaining months until the end of the year.
![9](https://user-images.githubusercontent.com/68736035/110448938-599ad300-80ca-11eb-8352-4e9b1fef3320.png)



**The html template isn't mine, I just want to learn Angular functionality**
