import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import React from "react";
import { MdArrowDropDown, MdArrowDropUp, MdTune } from "react-icons/md";
const spaceBetween = 2;

const colors = {
  colorActive: "#ffffff",
  colorInActive: "#ffa31a",
  bgColorActive: "#ffa31a",
  bgColorInActive: "#f8f9fd",
  buttonColorInactive: "#002A5685",
  backColor: "#1b1b1b",
  lightBgColor: "#f8f9fd",
  checkBox: "#00A2EA",
  primaryLight: "#395283",
};

// #ffa31a
// #808080
// #292929
// #1b1b1b
// #ffffff

const DataGridStyle = (props) => {
  const [pageSize, setPageSize] = React.useState(props.pagesize);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            marginBottom: 2,
            flexWrap: "wrap",
          }}
        >
          <GridToolbarColumnsButton
            sx={{
              marginRight: spaceBetween,
            }}
          />
          <GridToolbarFilterButton
            sx={{
              marginRight: spaceBetween,
            }}
          />
          {props.export && (
            <GridToolbarExport
              sx={{
                marginRight: spaceBetween,
              }}
            />
          )}
        </div>
        <GridToolbarQuickFilter
          sx={{
            padding: 0,
            marginBottom: 2,
            background: "white",
            borderRadius: "8px 8px 8px 8px",
            borderColor: "white",
            width: "auto",
            height: "40px",
            "& .MuiSvgIcon-root": {
              margin: "10px",
            },
            "& .MuiInput-underline:before": {
              display: "none",
            },
            "& .MuiInput-underline:after": {
              display: "none",
            },
            "& .MuiButtonBase-root": {
              display: "none",
            },
            "& .MuiInputBase-input": {
              // fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 300,
            },

            "& .MuiInput-underline:hover:before": {
              display: "none",
            },

            // .css-rtq1bq-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before
          }}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <DataGrid
      {...props}
      disableSelectionOnClick
      components={{
        ColumnSortedAscendingIcon: MdArrowDropDown,
        ColumnSortedDescendingIcon: MdArrowDropUp,
        // BaseSwitch: SwitchStyle,
        Toolbar: CustomToolbar,
        OpenFilterButtonIcon: MdTune,
        // QuickFilterIcon: MdSearch,
      }}
      componentsProps={{
        columnMenu: {
          sx: {
            backgroundColor: "white", // for example
            display: "grid",
          },
        },
      }}
      pageSize={pageSize}
      // hideFooterPagination
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 20]}
      sx={{
        backgroundColor: colors.backColor,
        // backgroundColor: "red",
        color: colors.colorActive,
        border: "none",
        marginBottom: 1,
        marginTop: 1,

        "& .MuiDataGrid-cell:focus ": {
          outline: "none",
        }, //to remove blue outline while cell selection
        "& .MuiDataGrid-columnHeader:focus": {
          outline: "none",
        },
        "& .MuiDataGrid-columnHeader:focus-within": {
          outline: "none",
        },
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },

        /* header styles starts */
        "& .MuiDataGrid-main": {
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          backgroundColor: colors.backColor,
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.bgColorActive,
          color: colors.colorActive,
          borderBottom: "1px solid #002A56",
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
        },

        /* menu */
        "& .MuiDataGrid-menuIconButton": {
          opacity: "0 !important",
          display: "none !important",
          color: colors.bgColorActive,
          // visibility: "visible !important",
          // position: "absolute",
          // left: "90%",
        },

        /* columns separator */
        "& .MuiDataGrid-iconSeparator": {
          display: "none",
        },

        "&  .MuiDataGrid-columnHeaderTitleContainerContent .MuiCheckbox-root": {
          color: colors.colorInActive,

          "&.Mui-checked": {
            color: colors.checkBox,
          },
        },

        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: 500,
          fontSize: "15px",
        },
        /* body checkbox color */
        "& .MuiDataGrid-cellCheckbox .MuiCheckbox-colorPrimary": {
          color: "black",
          //while checked
          "&.Mui-checked": {
            color: colors.checkBox,
          },
        },

        "& .MuiDataGrid-cellContent": {
          fontWeight: 400,
          fontSize: "small",
        },
        /* sort menu */
        "& .MuiDataGrid-sortIcon": {
          color: colors.colorActive,
          opacity: "inherit !important",
          visibility: "visible !important",
          position: "relative",
        },

        /*scroll bar */
        "& ::-webkit-scrollbar": {
          height: 5,
        },

        /*footer styles */
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: colors.backColor,
          borderTop: 0,
        },
        "& .MuiDataGrid-toolbarContainer": {
          backgroundColor: colors.backColor,
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        },
        "& .MuiButton-root": {
          color: "black",
        },
      }}
    />
  );
};

DataGridStyle.defaultProps = {
  export: true,
  pagesize: 10,
};

export default DataGridStyle;
