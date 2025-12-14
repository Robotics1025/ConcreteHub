'use client';

import { useState, useEffect } from 'react';
import {
    IconButton,
    Badge,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Button,
    Box,
    Avatar,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MessageIcon from '@mui/icons-material/Message';
import InfoIcon from '@mui/icons-material/Info';
import { useRouter } from 'next/navigation';

interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    read: boolean;
    link?: string;
    createdAt: string;
}

export default function NotificationBell() {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchNotifications();
        fetchUnreadCount();

        // Poll for new notifications every 30 seconds
        const interval = setInterval(() => {
            fetchUnreadCount();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch('/api/notifications?limit=5');
            if (response.ok) {
                const data = await response.json();
                setNotifications(data.notifications || []);
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const response = await fetch('/api/notifications/unread');
            if (response.ok) {
                const data = await response.json();
                setUnreadCount(data.count || 0);
            }
        } catch (error) {
            console.error('Failed to fetch unread count:', error);
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClick = async (notification: Notification) => {
        // Mark as read
        if (!notification.read) {
            try {
                await fetch(`/api/notifications/${notification.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ read: true }),
                });
                setUnreadCount((prev) => Math.max(0, prev - 1));
            } catch (error) {
                console.error('Failed to mark notification as read:', error);
            }
        }

        // Navigate if link exists
        if (notification.link) {
            router.push(notification.link);
        }

        handleClose();
    };

    const handleViewAll = () => {
        router.push('/notifications');
        handleClose();
    };

    const getIconByType = (type: string) => {
        switch (type) {
            case 'order':
                return <ShoppingCartIcon />;
            case 'message':
                return <MessageIcon />;
            default:
                return <InfoIcon />;
        }
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{ color: 'text.primary' }}
            >
                <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: 360,
                        maxHeight: 480,
                        mt: 1.5,
                    },
                }}
            >
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Notifications
                    </Typography>
                </Box>
                <Divider />

                {notifications.length === 0 ? (
                    <Box sx={{ py: 4, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            No notifications yet
                        </Typography>
                    </Box>
                ) : (
                    notifications.map((notification) => (
                        <MenuItem
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            sx={{
                                py: 2,
                                px: 2,
                                bgcolor: notification.read ? 'transparent' : 'action.hover',
                                '&:hover': {
                                    bgcolor: notification.read ? 'action.hover' : 'action.selected',
                                },
                            }}
                        >
                            <ListItemIcon>
                                <Avatar
                                    sx={{
                                        bgcolor: notification.read ? 'grey.300' : 'primary.main',
                                        width: 40,
                                        height: 40,
                                    }}
                                >
                                    {getIconByType(notification.type)}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText
                                primary={notification.title}
                                secondary={notification.message}
                                primaryTypographyProps={{
                                    sx: { fontWeight: notification.read ? 400 : 600, fontSize: '0.9rem' },
                                }}
                                secondaryTypographyProps={{
                                    sx: {
                                        fontSize: '0.8rem',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                    },
                                }}
                            />
                        </MenuItem>
                    ))
                )}

                {notifications.length > 0 && (
                    <>
                        <Divider />
                        <Box sx={{ p: 1 }}>
                            <Button
                                fullWidth
                                onClick={handleViewAll}
                                sx={{ textTransform: 'none', fontWeight: 600 }}
                            >
                                View All Notifications
                            </Button>
                        </Box>
                    </>
                )}
            </Menu>
        </>
    );
}
