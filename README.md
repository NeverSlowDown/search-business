
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:
```bash
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
``


## DEMO website

[https://search-business.vercel.app/](https://search-business.vercel.app/)

## Make endpoint work

enter
https://cors-anywhere.herokuapp.com/corsdemo

and get temp access to the server

## Comments

get 5 reviews from yelp is not possible with the official graphql yelp api
here is the issue:
https://github.com/Yelp/yelp-fusion/issues/36

there is a workaround though, I can add this feature by making an api call from here:
https://www.reviewsmaker.com/api/demo/yelp/

another problem of yelp api is that when it returns the times for the business it doesn't clarify the TIMEZONE of the business, so I can't parse it with moment to the current timezone.

