"use client";

import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MarkEmailUnreadRoundedIcon from "@mui/icons-material/MarkEmailUnreadRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";

const seedThreads = [
  {
    id: 1,
    sender: "Maria Costa",
    company: "Bay Concrete",
    preview: "Can we confirm delivery for Thursday morning?",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    sender: "James Patel",
    company: "Metro Builders",
    preview: "Please share the updated quote for steel mesh.",
    time: "5h ago",
    unread: false,
  },
  {
    id: 3,
    sender: "Ling Chen",
    company: "Skyline Dev",
    preview: "Need a packing list for last week shipments.",
    time: "1d ago",
    unread: false,
  },
  {
    id: 4,
    sender: "Sara Lopez",
    company: "Civic Works",
    preview: "Additives spec sheet looks good. Proceeding to PO.",
    time: "3d ago",
    unread: false,
  },
];

type Thread = typeof seedThreads[number];

type Filter = "all" | "unread";

export default function SupplierMessagesPage() {
  const [threads] = useState(seedThreads);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    return threads.filter((t) => {
      const q = search.toLowerCase();
      const matches =
        t.sender.toLowerCase().includes(q) ||
        t.company.toLowerCase().includes(q) ||
        t.preview.toLowerCase().includes(q);
      const unreadOk = filter === "all" ? true : t.unread;
      return matches && unreadOk;
    });
  }, [threads, search, filter]);

  const unreadCount = threads.filter((t) => t.unread).length;

  return (
    <Box sx={{ bgcolor: "#F7F9FB", minHeight: "100vh", pb: 6 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={1.2} sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <ChatBubbleRoundedIcon sx={{ color: "#FF6A00" }} />
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -0.2 }}>
              Messages
            </Typography>
            <Chip label={`${unreadCount} unread`} size="small" color="warning" sx={{ fontWeight: 700 }} />
          </Stack>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Keep replies quick and organized across buyers.
          </Typography>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid rgba(145, 158, 171, 0.16)",
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.05)",
            p: { xs: 2, md: 3 },
            bgcolor: "white",
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "center" }} sx={{ mb: 2 }}>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search senders or companies"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ color: "text.disabled" }} />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <Chip
              label="All"
              color={filter === "all" ? "primary" : "default"}
              onClick={() => setFilter("all")}
              sx={{ fontWeight: 700 }}
            />
            <Chip
              label="Unread"
              color={filter === "unread" ? "primary" : "default"}
              onClick={() => setFilter("unread")}
              sx={{ fontWeight: 700 }}
            />
          </Stack>

          <List sx={{ width: "100%" }}>
            {filtered.map((t) => (
              <ListItem
                key={t.id}
                alignItems="flex-start"
                sx={{
                  border: "1px solid rgba(145,158,171,0.12)",
                  borderRadius: 2,
                  mb: 1,
                  bgcolor: t.unread ? "rgba(255, 250, 235, 0.7)" : "white",
                }}
                secondaryAction={
                  <IconButton edge="end">
                    <MoreVertRoundedIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: t.unread ? "#FFB020" : "#E5E7EB", color: "#111827" }}>
                    {t.sender.slice(0, 1)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography sx={{ fontWeight: 800 }}>{t.sender}</Typography>
                      <Chip size="small" label={t.company} sx={{ bgcolor: "#F1F5F9", fontWeight: 600 }} />
                      {t.unread && <MarkEmailUnreadRoundedIcon sx={{ fontSize: 18, color: "#F59E0B" }} />}
                      <Typography variant="body2" sx={{ color: "text.secondary", ml: "auto" }}>
                        {t.time}
                      </Typography>
                    </Stack>
                  }
                  secondary={
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                      <CircleRoundedIcon sx={{ fontSize: 8, color: "#94A3B8" }} />
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {t.preview}
                      </Typography>
                    </Stack>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
