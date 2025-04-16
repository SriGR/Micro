"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ViewCard = ({
  title = "Details",
  selectedRow = {},
  onEdit,
  onCancel,
  onCreateNew,
}) => {
  console.log("ViewCard selectedRow", selectedRow);

  return (
    <div className="p-4">
      <Card className="w-full mb-4">
        <CardHeader
          title={
            <h2 className="text-sm font-semibold text-gray-700 underline">
              {title}
            </h2>
          }
          action={
            <IconButton color="primary" onClick={onCreateNew}>
              <AddCircleOutlineIcon />
            </IconButton>
          }
          sx={{ paddingBottom: 1 }}
        />
        <CardContent>
          {Object.keys(selectedRow).length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No data selected.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {Object.entries(selectedRow).map(([key, value]) => (
                <Grid item xs={12} sm={4} key={key}>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.85rem", fontWeight: 500, color: "#374151" }}
                  >
                    <span className="font-semibold">{key.replace(/([A-Z])/g, " $1")} :</span>
                    <span className="font-normal text-gray-700 ml-1">
                      {value || "-"}
                    </span>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={onEdit}
              size="small"
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CancelIcon />}
              onClick={onCancel}
              size="small"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewCard;
