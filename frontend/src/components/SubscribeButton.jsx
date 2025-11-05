import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';
import { FiBell } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa';

function SubscribeButton({channelUsername, initialSubscribed = false, size = 'md'}) {
    const [subscribed, setSubscribed] = useState(initialSubscribed);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSubscribed(initialSubscribed);
    }, [initialSubscribed]);

    const handleSubscribeToggle = async () => {
        if (!channelUsername) return;

        setLoading(true);

        try {
            const res = await axiosInstance.post(`/api/subscription/${channelUsername}`);
            const message = res.data.message || '';
            
            if (message.toLowerCase().includes('unsubscribed')) {
                setSubscribed(false);
                toast.success('Unsubscribed successfully');
            } else if (message.toLowerCase().includes('subscribed')) {
                setSubscribed(true);
                toast.success('Subscribed successfully');
            } else {
                toast.info('Subscription status updated');
            }

        } catch (error) {
            console.error('Subscription error: ', error);
            toast.error('Failed to toggle subscription');
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            disabled={loading}
            onClick={handleSubscribeToggle}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm cursor-pointer font-medium transition 
                ${subscribed ? 'bg-gray-200 text-black hover:bg-gray-300 animate-pulse' : 'bg-red-600 text-white hover:bg-red-800'}`}>
            {subscribed ? <FaBell size={18} /> : <FiBell size={18} />}
            {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
    )
}

export default SubscribeButton;
