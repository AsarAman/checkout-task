import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  heightPercentageToDP as heightToDp,
  widthPercentageToDP as widthToDp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
//import Button from "../../components/Button";
import Header from "../../components/Header";
import InputField from "../../components/InputField";
import RadioButton from "../../components/RadioButton";
import baseURL from "../../constants/URL";

export default function Checkout() {
  const [paymentInfo, setPaymentInfo] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [couponAmount, setCouponAmount] = useState(0);
  const [couponFieldValue, setCouponFieldValue] = useState("");
  const [loader, setLoader] = useState(false);

  const [appliedPointDiscount, setAppliedPointDiscount] = useState(0);
  const [appliedPointFieldValue, setAppliedPointFieldValue] = useState("");
  const checkoutData = {
    total: 200,
    tax: 10,
    shipping: 5,
  };
  const [paymentOptions, setPaymentOptions] = useState([
    {
      id: "1",
      name: "Card",
    },
    {
      id: "2",
      name: "Tabby",
    },
    {
      id: "3",
      name: "Apple Pay",
    },
  ]);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("1");
  const [spentAllPoints, setSpentAllPoints] = useState(false);

  const handlePaymentInputChange = (card: any) => {
    setPaymentInfo(card);
  };

  const handleAddressInputChange = (address: any) => {
    setShippingAddress(address);
  };
  const handleCoupon = () => {
    console.log("points");
    // Post coupon to server
    setLoader(true);
    axios
      .post(
        `${baseURL}/coupon`,
        {
          coupon: couponFieldValue,
        }
        
      )
      .then(async ({ data }) => {
        setLoader(false);
        console.log("data =>", data);
        setCouponAmount(parseInt(data.amount + ""));
        alert(data.message);
      })
      .catch((error) => {
        setLoader(false);
        console.log("error =>", error);
        alert("Invalid Coupon");
      });
  };
  const pointsSpend = () => {
    // Post points to server
    setLoader(true);

    axios
      .post(`${baseURL}/points`, {
        points: spentAllPoints ? 100 : 3,
      }
      
    )
      .then(({ data }) => {
        console.log("data =>", data);
        setLoader(false);

        setAppliedPointDiscount(parseInt(data.amount + ""));
        alert(data.message);
      })
      .catch((error) => {
        setLoader(false);
        console.log("error =>", error);
        alert("Invalid Points");
      });
  };

  // Calling the API when user presses the "Place Order" button
  const placeOrder = async () => {
    setLoader(true);
    axios
      .post(`${baseURL}/checkout`, {
        paymentInfo,
        shippingAddress,
        couponAmount,
        appliedPointDiscount,
        selectedPaymentOption,
      }
     
    )
      .then(({ data }) => {
        console.log("data =>", data);
        setLoader(false);
        alert(data.message);
        resetAllData();
      })
      .catch((error) => {
        setLoader(false);
        console.log("error =>", error);
        alert("Cannot place order");
      });
  };
  const resetAllData = () => {
    setPaymentInfo({});
    setShippingAddress({});
    setCouponAmount(0);
    setCouponFieldValue("");
    setLoader(false);
    setAppliedPointDiscount(0);
    setAppliedPointFieldValue("");
    setSelectedPaymentOption("1");
    setSpentAllPoints(false);
  };
  useEffect(() => {
    resetAllData();
    // Calling the function to fetch the payment options when the component mounts
    // fetchPaymentOption();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {loader ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text> Fetching data...</Text>
          <ActivityIndicator size="small" color="#E5E5E5" />
        </View>
      ) : (
        <ScrollView>
          <Header title="CHECKOUT" />
          <View style={styles.box}>
            <Text style={styles.title}>YOU WILL EARN 300 POINTS!</Text>
            <InputField
              placeholder="Have a coupon?"
              onChangeText={(text: any) => setCouponFieldValue(text)}
            />
            <View style={styles.button}>
              <TouchableOpacity onPress={handleCoupon}>
                <Text style={styles.buttonTitle}>APPLY</Text>
              </TouchableOpacity>
              {/* <Button onPress={handleCoupon}  title="Apply" /> */}
            </View>
          </View>
          <View style={styles.borderLine}></View>
          <View style={styles.box}>
            <Text style={styles.title}>SPEND REWARD POINTS!</Text>
            <InputField
              placeholder="Amount of points to spend"
              onChangeText={(text: any) => {
                if (!isNaN(text) && parseInt(text) <= 100) {
                  setAppliedPointFieldValue(text);
                }
              }}
              disabled={spentAllPoints}
            />
            <View style={{ marginTop: 10 }}>
              <RadioButton
                children={<Text>Spend all Points</Text>}
                onPress={() => setSpentAllPoints(!spentAllPoints)}
                selected={spentAllPoints}
              />
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={pointsSpend}>
                <Text style={styles.buttonTitle}>APPLY</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderLine}></View>
          <View style={styles.box}>
            <Text style={styles.title}>SELECT PAYMENT METHOD</Text>

            {paymentOptions.map((option, index) => (
              <View key={index} style={styles.total}>
                <RadioButton
                  onPress={() => setSelectedPaymentOption(option.id)}
                  key={option.id}
                  selected={selectedPaymentOption === option.id}
                  children={<Text>{option.name}</Text>}
                />
              </View>
            ))}
          </View>

          <View style={styles.box}>
            <View style={[styles.row, styles.total]}>
              <Text style={styles.cartTotalText}>TOTAL</Text>
              <Text
                style={[
                  styles.cartTotalText,
                  {
                    color: "#4C4C4C",
                  },
                ]}
              >
                {/* Calculating the total */}${checkoutData.total}
              </Text>
            </View>
            <View style={[styles.row, styles.total]}>
              <Text style={styles.cartTotalText}>TAX</Text>
              <Text
                style={[
                  styles.cartTotalText,
                  {
                    color: "#4C4C4C",
                  },
                ]}
              >
                {/* Calculating the total */}${checkoutData.tax}
              </Text>
            </View>
            <View style={[styles.row, styles.total]}>
              <Text style={styles.cartTotalText}>SHIPPING</Text>
              <Text
                style={[
                  styles.cartTotalText,
                  {
                    color: "#4C4C4C",
                  },
                ]}
              >
                {/* Calculating the total */}${checkoutData.shipping}
              </Text>
            </View>
            {couponAmount > 0 && (
              <View style={[styles.row, styles.total]}>
                <Text style={styles.cartTotalText}>Coupon Discount</Text>
                <Text
                  style={[
                    styles.cartTotalText,
                    {
                      color: "#4C4C4C",
                    },
                  ]}
                >
                  {/* Calculating the total */}-${couponAmount}
                </Text>
              </View>
            )}
            {appliedPointDiscount > 0 && (
              <View style={[styles.row, styles.total]}>
                <Text style={styles.cartTotalText}>Points Discount</Text>
                <Text
                  style={[
                    styles.cartTotalText,
                    {
                      color: "#4C4C4C",
                    },
                  ]}
                >
                  {/* Calculating the total */}-${appliedPointDiscount}
                </Text>
              </View>
            )}
            <View style={[styles.row, styles.total]}>
              <Text style={styles.grandTotalText}>Grand Total</Text>
              <Text style={styles.grandTotalText}>
                {/* Calculating the total */}$
                {checkoutData.total +
                  checkoutData.tax +
                  checkoutData.shipping -
                  couponAmount -
                  appliedPointDiscount}
              </Text>
            </View>
            <View>
              <TextInput
                multiline
                placeholder="I want to add comment"
                style={{
                  borderWidth: 1,
                  padding: 10,
                  height: 140,
                  textAlignVertical: "top",
                  marginTop: 15,
                  backgroundColor: "#FAFAFA",
                  borderRadius: 8,
                }}
              />
              <View style={[styles.button, styles.payBtn]}>
                <TouchableOpacity onPress={placeOrder}>
                  <Text style={styles.buttonTitle}>Place Order</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },

  address: {},
  box: {
    marginHorizontal: 15,
    marginTop: 3,
  },
  shipping: {
    marginHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 23,
    letterSpacing: 0.8,
  },
  button: {
    height: 50,
    backgroundColor: "#454B51",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTitle: {
    color: "#ffffff",
    fontSize: 15,
  },
  payBtn: {
    backgroundColor: "#B9853E",
  },

  shippingOption: {
    marginTop: heightToDp(2),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: widthToDp(90),
    marginTop: 4,
  },
  total: {
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: "#E5E5E5",

    marginTop: 20,
  },
  cartTotalText: {
    fontSize: widthToDp(3.5),
    color: "#989899",
  },
  grandTotalText: {
    fontSize: widthToDp(4.5),
    color: "#4C4C4C",
    fontWeight: "bold",
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    marginBottom: 20,
  },
});
