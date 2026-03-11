'use client';

import { useState, useEffect } from 'react';
import { subscribeToPushNotifications, getPushSubscription } from '@/lib/pushNotifications';

export default function PushNotificationButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    checkSupport();
    checkSubscription();
  }, []);

  const checkSupport = () => {
    const supported =
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      'Notification' in window;
    console.log('[Push] Browser support:', supported);
    setIsSupported(supported);
  };

  const checkSubscription = async () => {
    const subscription = await getPushSubscription();
    setIsSubscribed(!!subscription);
  };

  const handleSubscribe = async () => {
    const subscription = await subscribeToPushNotifications();
    if (subscription) {
      setIsSubscribed(true);
      console.log('[Push] Subscription successful!');
    } else {
      console.log('[Push] Subscription failed or was denied');
    }
  };

  if (!isSupported) {
    // Show a disabled button if not supported
    return (
      <button
        disabled
        className="px-6 py-3 rounded-lg font-semibold bg-gray-300 text-gray-600 cursor-not-allowed"
        title="Push notifications not supported in this browser"
      >
        🔔 Notifications Not Supported
      </button>
    );
  }

  return (
    <button
      onClick={handleSubscribe}
      data-testid="subscribe-push-button"
      disabled={isSubscribed}
      className={`px-6 py-3 rounded-lg font-semibold ${
        isSubscribed
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isSubscribed ? '✓ Subscribed to Notifications' : '🔔 Enable Notifications'}
    </button>
  );
}
