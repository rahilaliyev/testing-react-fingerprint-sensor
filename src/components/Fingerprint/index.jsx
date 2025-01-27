import { useState } from "react";

const FingerPrintComponent = () => {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  // Check if biometric authentication is available
  const checkBiometricSupport = async () => {
    try {
      const isAvailable =
        await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      setIsBiometricAvailable(isAvailable);

      window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(
        (res) => console.log(res)
      );

      if (!isAvailable) {
        alert("Biometric authentication is not available on this device.");
      }
    } catch (error) {
      console.error("Error checking biometric support:", error);
      alert("Failed to check biometric support.");
    }
  };

  const handleBiometricAuth = async () => {
    if (!isBiometricAvailable) return;

    try {
      // Request public key credentials for biometric authentication
      const credential = await navigator.credentials.create({
        publicKey: {
          // Example options (in production, you'd fetch these from your backend)
          challenge: new Uint8Array(32), // Challenge generated by the server
          rp: { name: "Example App" }, // Relying Party (your app)
          user: {
            id: new Uint8Array(16), // User ID from your backend
            name: "rahil.aliyev@gmail.com", // User name/email
            displayName: "Rahil Aliyev",
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }], // Algorithm for key pair
        },
      });

      if (credential) {
        alert("Biometric authentication successful!");
        console.log("PublicKeyCredential:", credential);
      }
    } catch (error) {
      console.error("Error with biometric authentication:", error);
      alert("Biometric authentication failed or was canceled.");
    }
  };

  return (
    <div>
      <button onClick={checkBiometricSupport}>Check Biometric Support</button>

      {isBiometricAvailable && (
        <button onClick={handleBiometricAuth}>
          Authenticate with Touch ID / Fingerprint
        </button>
      )}
    </div>
  );
};

export default FingerPrintComponent;
