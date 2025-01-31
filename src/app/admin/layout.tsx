import React from "react";
import { Container, CssBaseline, Drawer, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CssBaseline />
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem component="button" button>
            <ListItemText>
              <Link href="/admin/dashboard">Dashboard</Link>
            </ListItemText>
          </ListItem>
          <ListItem component="button" button>
            <ListItemText>
              <Link href="/admin/orders">Orders</Link>
            </ListItemText>
          </ListItem>
          <ListItem component="button" button>
            <ListItemText>
              <Link href="/admin/products">Products</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <Container sx={{ marginLeft: 240, paddingTop: 2 }}>
        {children}
      </Container>
    </>
  );
};

export default AdminLayout;
