

import { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getMessaging, getToken } from "firebase/messaging"
import googlePlayLogo from "./images/google-play-download.png"
import appStoreLogo from "./images/app-stote-download.png"

// Replace with your Firebase config and VAPID key
 const firebaseConfig = {
   apiKey: "AIzaSyC5yLgEebmBeEXCqe6KoAWfU11grNYAU1g",
   authDomain: "notification-service-a08cb.firebaseapp.com",
   projectId: "notification-service-a08cb",
   storageBucket: "notification-service-a08cb.firebasestorage.app",
   messagingSenderId: "747855558903",
   appId: "1:747855558903:web:81ea5fcb447b538f047bf2"
}
// --- Replace with your VAPID key from Firebase Cloud Messaging ---
 const VAPID_KEY = "BFaKFmFb0bHSp82JlYCeqJU6F2L9yVUHfFPYvIa9zYshvNP_aqSHpC-fBG4scVBe3DZnY_mrzFiLIcAKFx-jXG8"

const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

const App = () => {
  const [user, setUser] = useState({ email: "", tel: "" })
  const [status, setStatus] = useState(null)
  const [fcmToken, setFcmToken] = useState("")

  useEffect(() => {
    const getFcmToken = async () => {
      try {
        const permission = await Notification.requestPermission()
        if (permission === "granted") {
          const token = await getToken(messaging, { vapidKey: VAPID_KEY })
          setFcmToken(token)
        } else {
          setStatus("Push notification permission denied.")
        }
      } catch (error) {
        setStatus("Failed to get push notification token: " + error.message)
      }
    }
    getFcmToken()
  }, [])

  const updateUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const registerUser = async (e) => {
    e.preventDefault()
    setStatus(null)
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ ...user, fcmToken }),
        headers: { "Content-Type": "application/json" }
      }
      const response = await fetch("http://localhost:8000/register", options)
      const data = await response.json()
      if (data.success) {
        setStatus("Registration successful! Check your email, SMS, or push notifications.")
      } else {
        setStatus("Registration failed: " + (data.error || "Unknown error"))
      }
    } catch (error) {
      setStatus("Registration failed: " + error.message)
    }
  }

  return (
    <div className="auth-modal">
      <div className="close-icon">☒</div>
      <h2>Sign Up</h2>
      <p>
        By signing up you agree to our terms and conditions. Learn about our
        Privacy Policy before clicking submit. 
      </p>
      <form onSubmit={registerUser}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          onChange={updateUser}
          value={user.email}
          required
        />
        <input
          type="tel"
          id="tel"
          name="tel"
          placeholder="Phone Number"
          onChange={updateUser}
          value={user.tel}
          required
        />
        <label>
          <input type="checkbox" required />
          I agree to the terms and conditions.
        </label>
        <input type="submit" className="form-button" />
      </form>

      {status && <div className="status-message">{status}</div>}

      <hr />

      <h2>Download the app</h2>
      <div className="link-container">
        <a href="http://play.google.com/store">
          <img src={googlePlayLogo} alt="google play icon" />
        </a>
        <a href="http://www.apple.com/store">
          <img src={appStoreLogo} alt="apple store icon" />
        </a>
      </div>
    </div>
  )
}

export default App
