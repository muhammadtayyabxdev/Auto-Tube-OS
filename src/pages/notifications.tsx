import Head from 'next/head';


import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/notifications.module.css';
import { useAuth } from '@/hooks/useAuth';
import { 
  Check, 
  Trash2, 
  Bot, 
  Trophy, 
  CreditCard, 
  Settings, 
  MailOpen, 
  Sparkles 
} from 'lucide-react';
import Link from 'next/link';

interface NotificationItem {
  id: number;
  type: 'ai' | 'milestone' | 'account' | 'system';
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  actionText?: string;
  actionLink?: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    type: 'ai',
    title: 'AI Script Generated',
    desc: "Google Gemini has finished generating the script 'Why 99% of People Stay Broke' with a high engagement score of 8.9.",
    time: '5m ago',
    unread: true,
    actionText: 'View Script',
    actionLink: '/script-generator',
  },
  {
    id: 2,
    type: 'ai',
    title: 'AI Trend Alert',
    desc: "Topic Finder detected a high-yield low-competition topic: 'AI side hustles for students in 2026' with an estimated RPM of $14.50.",
    time: '1h ago',
    unread: true,
    actionText: 'View Topic',
    actionLink: '/dashboard?view=topics',
  },
  {
    id: 3,
    type: 'milestone',
    title: 'Subscribers Milestone Reached!',
    desc: "Congratulations! Your channel 'Finance YouTube' just crossed the 241,000 subscriber mark! You gained 3.2K this week.",
    time: '3h ago',
    unread: false,
    actionText: 'Go to Analytics',
    actionLink: '/dashboard?view=analytics',
  },
  {
    id: 4,
    type: 'milestone',
    title: 'High Retention Detected',
    desc: "Your latest video hit 71% audience retention at the 30-second mark! That is 15% above your channel average.",
    time: 'Yesterday',
    unread: false,
    actionText: 'Analyze Video',
    actionLink: '/dashboard?view=analytics',
  },
  {
    id: 5,
    type: 'account',
    title: 'Pro Plan Renewed Successfully',
    desc: "Your monthly AutoTubeOS Pro subscription was processed successfully for $29.00. Thank you for building with us!",
    time: '2 days ago',
    unread: false,
    actionText: 'View Invoice',
    actionLink: '/emails',
  },
  {
    id: 6,
    type: 'system',
    title: 'YouTube Integration Active',
    desc: "API credentials and secure sync channels for 'Finance YouTube' have been verified and activated successfully.",
    time: '3 days ago',
    unread: false,
    actionText: 'Manage Integrations',
    actionLink: '/settings',
  },
];

export default function NotificationsCenter() {
  const { loading } = useAuth(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'ai' | 'milestone' | 'system'>('all');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#07080c',
        color: '#eef0f6',
        fontFamily: 'sans-serif'
      }}>
        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#ff3d3d" style={{ marginBottom: '16px' }}>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="3">
              <circle strokeOpacity=".1" cx="18" cy="18" r="18" stroke="#ffffff"/>
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
        <div style={{ fontSize: '12px', color: '#a0aec0', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Verifying Session...
        </div>
      </div>
    );
  }

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Filter logic
  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return n.unread;
    if (activeTab === 'ai') return n.type === 'ai';
    if (activeTab === 'milestone') return n.type === 'milestone';
    if (activeTab === 'system') return n.type === 'system' || n.type === 'account';
    return true;
  });

  // Category counts
  const countUnread = notifications.filter((n) => n.unread).length;
  const countAi = notifications.filter((n) => n.type === 'ai').length;
  const countMilestones = notifications.filter((n) => n.type === 'milestone').length;
  const countSystem = notifications.filter((n) => n.type === 'system' || n.type === 'account').length;

  // Actions
  const toggleReadStatus = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const nextState = !n.unread;
          triggerToast(nextState ? 'Marked as unread' : 'Marked as read');
          return { ...n, unread: nextState };
        }
        return n;
      })
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    triggerToast('Notification deleted');
  };

  const markAllAsRead = () => {
    const unreadCount = notifications.filter((n) => n.unread).length;
    if (unreadCount === 0) {
      triggerToast('All notifications are already read');
      return;
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    triggerToast(`Marked ${unreadCount} notifications as read`);
  };

  const clearAllNotifications = () => {
    if (notifications.length === 0) return;
    setNotifications([]);
    triggerToast('Cleared all notifications');
  };

  // Get matching category icon
  const getCategoryIcon = (type: 'ai' | 'milestone' | 'account' | 'system') => {
    switch (type) {
      case 'ai':
        return <Bot size={18} />;
      case 'milestone':
        return <Trophy size={18} />;
      case 'account':
        return <CreditCard size={18} />;
      case 'system':
        return <Settings size={18} />;
    }
  };

  return (
    <div className={styles.shell}>
      <Head>
        <title>Notification Center — AutoTube OS</title>
        <meta name="description" content="Stay updated with team task completions, approval requests, and channel performance alerts." />
      </Head>

      {/* GLOBAL NAVIGATION SIDEBAR */}
      <Sidebar />

      {/* NOTIFICATIONS WORKSPACE */}
      <div className={styles.main}>
        {/* TOPBAR */}
        <div className={styles.topbar}>
          <div className={styles.tbTitle}>Notifications Center</div>
          
          <div className={styles.topbarActions}>
            {notifications.length > 0 && (
              <>
                <button className={styles.tbActionBtn} onClick={markAllAsRead}>
                  <Check size={13} /> Mark All Read
                </button>
                <button className={`${styles.tbActionBtn} ${styles.tbClearBtn}`} onClick={clearAllNotifications}>
                  <Trash2 size={13} /> Clear All
                </button>
              </>
            )}
          </div>
        </div>

        {/* WORKSPACE CONTENT */}
        <div className={styles.content}>
          <div className={styles.container}>
            
            {/* TABS FILTERS */}
            <div className={styles.filterTabs}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'all' ? styles.active : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All <span className={styles.badge}>{notifications.length}</span>
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'unread' ? styles.active : ''}`}
                onClick={() => setActiveTab('unread')}
              >
                Unread {countUnread > 0 && <span className={styles.badge}>{countUnread}</span>}
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'ai' ? styles.active : ''}`}
                onClick={() => setActiveTab('ai')}
              >
                AI Alerts <span className={styles.badge}>{countAi}</span>
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'milestone' ? styles.active : ''}`}
                onClick={() => setActiveTab('milestone')}
              >
                Milestones <span className={styles.badge}>{countMilestones}</span>
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'system' ? styles.active : ''}`}
                onClick={() => setActiveTab('system')}
              >
                System <span className={styles.badge}>{countSystem}</span>
              </button>
            </div>

            {/* NOTIFICATIONS LIST */}
            {filteredNotifications.length > 0 ? (
              <div className={styles.notifList}>
                {filteredNotifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`${styles.card} ${n.unread ? styles.unread : ''}`}
                  >
                    {/* Category Icon Badge */}
                    <div className={`${styles.iconWrap} ${styles[n.type]}`}>
                      {getCategoryIcon(n.type)}
                    </div>

                    {/* Card Description / Content */}
                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <div className={styles.title}>{n.title}</div>
                        <div className={styles.time}>{n.time}</div>
                      </div>
                      <div className={styles.desc}>{n.desc}</div>
                      
                      {n.actionText && n.actionLink && (
                        <div className={styles.cardActions}>
                          <Link href={n.actionLink} className={styles.actionBtn}>
                            {n.actionText}
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Interactive Mark Read / Delete Controls */}
                    <div className={styles.controls}>
                      <button 
                        className={styles.ctrlBtn} 
                        onClick={() => toggleReadStatus(n.id)}
                        title={n.unread ? "Mark as read" : "Mark as unread"}
                      >
                        {n.unread ? <Check size={14} /> : <MailOpen size={14} />}
                      </button>
                      <button 
                        className={`${styles.ctrlBtn} ${styles.delete}`} 
                        onClick={() => deleteNotification(n.id)}
                        title="Delete notification"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* GLASSMORPHISM EMPTY STATE */
              <div className={styles.emptyState}>
                <div className={styles.emptyIconWrap}>
                  <Sparkles size={28} />
                </div>
                <h3 className={styles.emptyTitle}>All caught up!</h3>
                <p className={styles.emptyDesc}>
                  {activeTab === 'unread' 
                    ? "You don't have any unread notifications right now."
                    : "Your notifications inbox is empty. We'll alert you when exciting new updates occur!"
                  }
                </p>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* TOAST SYSTEM */}
      <div className={`${styles.toast} ${showToast ? styles.show : ''}`}>
        <Check size={16} /> {toastMessage}
      </div>
    </div>
  );
}
