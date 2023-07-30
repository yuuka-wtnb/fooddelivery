import React from "react";
import App from "next/app";
import Head from "next/head";

//Appで使っているものをMy Appで使うことができる
export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
          />
        </Head>
        <Component {...pageProps}></Component>
      </>
    );
  }
}
