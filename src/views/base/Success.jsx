import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";

import apiInstance from "../../utils/axios";

function Success() {
  const [order, setOrder] = useState([]);
  const [orderMessage, setOrderMessage] = useState("");

  const param = useParams();
  const urlParam = new URLSearchParams(window.location.search);
  const sessionId = urlParam.get("session_id");
  const paypalOrderId = urlParam.get("paypal_order_id");

  console.log(sessionId);
  console.log(paypalOrderId);
  console.log(param);

  useEffect(() => {
    const formdata = new FormData();

    formdata.append("order_oid", param.order_oid);
    formdata.append("session_id", sessionId);
    formdata.append("paypal_order_id", paypalOrderId);

    setOrderMessage("Processing Payment");

    try {
      apiInstance.post(`payment/payment-sucess/`, formdata).then((res) => {
        console.log(res.data);
        setOrderMessage(res.data.message);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(orderMessage);

  return (
    <>
      <BaseHeader />

      <section className="pt-0  position-relative overflow-hidden my-auto">
        <div className="container position-relative">
          <div className="row g-5 align-items-center justify-content-center">
            {/* Payment Successfull */}
            {orderMessage === "Payment Successfull" && (
              <>
                <div className="col-lg-5">
                  <h1 className="text-success">Зачисление прошло успешно!</h1>
                  <p>
                    {" "}
                    Привет, вы записались на курс. Теперь вы можете посетить страницу <a href="">Мои курсы</a>.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary mb-0 rounded-2"
                  >
                    Просмотр зарегистрированных курсов <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
                <div className="col-lg-7 text-center">
                  <img
                    src="https://assets.materialup.com/uploads/bc4c9683-f623-42ef-9014-464ba0411c79/preview.png"
                    className="h-300px h-sm-400px h-md-500px h-xl-700px"
                    alt=""
                  />
                </div>
              </>
            )}

            {/* Already Paid */}
            {orderMessage === "Already Paid" && (
              <>
                <div className="col-lg-5">
                  <h1 className="text-success">Уже оплачено</h1>
                  <p>
                    {" "}
                    Привет, вы записались на курс. Теперь вы можете посетить страницу <a href="">Мои курсы</a>.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary mb-0 rounded-2"
                  >
                    Просмотр зарегистрированных курсов <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
                <div className="col-lg-7 text-center">
                  <img
                    src="https://assets.materialup.com/uploads/bc4c9683-f623-42ef-9014-464ba0411c79/preview.png"
                    className="h-300px h-sm-400px h-md-500px h-xl-700px"
                    alt=""
                  />
                </div>
              </>
            )}

            {/* Processing */}
            {orderMessage === "Processing Payment" && (
              <>
                <div className="col-lg-5">
                  <h1 className="text-warning">
                      Обработка платежа{" "}
                    <i className="fas fa-spinner fa-spin"></i>
                  </h1>
                  <p>
                    {" "}
                    Привет, подождите, пока мы обработаем ваш платеж, пожалуйста, не покидайте страницу.
                  </p>
                </div>
                <div className="col-lg-7 text-center">
                  <img
                    sty
                    src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1259.gif"
                    className="h-300px h-sm-400px h-md-500px h-xl-700px"
                    alt=""
                  />
                </div>
              </>
            )}

            {/* Failed */}
            {orderMessage === "Payment Failed" && (
              <>
                <div className="col-lg-5">
                  <h1 className="text-danger">Payment Failed 😔</h1>
                  <p>
                  К сожалению, Ваш платеж не прошел. Повторите попытку.
                  </p>
                  <button
                    type="button"
                    className="btn btn-danger mb-0 rounded-2"
                  >
                    Повторить <i className="fas fa-repeat"></i>
                  </button>
                </div>
                <div className="col-lg-7 text-center">
                  <img
                    sty
                    src="https://media3.giphy.com/media/h4OGa0npayrJX2NRPT/giphy.gif?cid=790b76117pc6298jypyph0liy6xlp3lzb7b2y405ixesujeu&ep=v1_stickers_search&rid=giphy.gif&ct=e"
                    className="h-300px h-sm-400px h-md-500px h-xl-700px"
                    alt=""
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Success;
