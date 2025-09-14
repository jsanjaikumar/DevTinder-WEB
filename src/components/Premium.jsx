import axios from 'axios';
import {useEffect, useState} from 'react'
import { BASE_URL } from '../utils/constants';

const Premium = () => {
    const [isUserPremium, setIsUserPremium] = useState(false);

     useEffect(() => {
       verifyPremiumUser();
     }, []);

     //verify the user is premium or not
    const verifyPremiumUser = async () => {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    };


    const handleBuyClick = async (type) => {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: type,
        },
        { withCredentials: true }
      );

      const { orderId ,amount, currency, razorpayKeyId, notes } = order.data;
      console.log(orderId, amount, currency, razorpayKeyId, notes);

      //it should be open the razorpay payment gateway
      const options = {
        key: razorpayKeyId, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: "Dev Dudes",
        description: "To get premium membership",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

       const rzp = new window.Razorpay(options);
       rzp.open();
    };


  return isUserPremium ? (
    "You're are already a premium user"
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Inifiniye connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
}

export default Premium;