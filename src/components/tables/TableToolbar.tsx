import {
  Paper,
  Tooltip,
  IconButton,
  Menu,
  Popover,
  OutlinedInput,
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SEARCH_ICON_TOOLTIP = "查找字段";
const FILTER_ICON_TOOLTIP = "过滤字段";
const DELETE_SELECTION_ROWS_TOOLTIP = "删除所选";
const ADD_TOOLTIP = "添加";
const FILE_DOWNLOAD_TOOLTIP = "导出至csv文件";
const PDF_ICON_TOOLTIP = "导出至pdf";
const FILE_UPLOAD_TOOLTIP = "导入文件";

const TableToolbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-between">
      <section className="flex">
        {/* 删除  */}
        <Tooltip title={DELETE_SELECTION_ROWS_TOOLTIP}>
          <div className={``}>
            <IconButton
              onClick={() => {}}
              // disabled={isSelectionEmpty}
            >
              {true ? (
                <DeleteOutlineIcon color="action" />
              ) : (
                <DeleteIcon color="primary" />
              )}
            </IconButton>
          </div>
        </Tooltip>

        {/* 导出至csv文件 */}
        <Tooltip title={FILE_DOWNLOAD_TOOLTIP}>
          <div className={``}>
            <IconButton
              onClick={() => {}}
              // disabled={isSelectionEmpty}
            >
              <FileDownloadIcon color="primary" />
            </IconButton>
          </div>
        </Tooltip>

        {/* 导出至pdf文件 */}
        <Tooltip title={PDF_ICON_TOOLTIP}>
          <div className={``}>
            <IconButton
              onClick={() => {}}
              // disabled={isSelectionEmpty}
            >
              <PictureAsPdfIcon color="primary" />
            </IconButton>
          </div>
        </Tooltip>

        {/* 导入文件 */}
        <Tooltip title={FILE_UPLOAD_TOOLTIP}>
          <div className="cursor-not-allowed">
            <IconButton disabled>
              <FileUploadIcon color={`disabled`} />
            </IconButton>
          </div>
        </Tooltip>

        {/* 搜索 */}
        {/* <Tooltip title={SEARCH_ICON_TOOLTIP}>
          <IconButton onClick={() => {}}>
            {true ? (
              <SearchOffIcon color="primary" />
            ) : (
              <SearchIcon color="primary" />
            )}
          </IconButton>
        </Tooltip> */}

        {/* 选择字段 */}
        <Tooltip title={FILTER_ICON_TOOLTIP}>
          <IconButton onClick={handleClick}>
            {true ? (
              <FilterListOffIcon color="primary" />
            ) : (
              <FilterListIcon color="primary" />
            )}
          </IconButton>
        </Tooltip>

        <Popover
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="w-28rem p-4 flex ">
            <SwitchLabels></SwitchLabels>

            <SwitchLabels></SwitchLabels>

            <SwitchLabels></SwitchLabels>
          </div>
        </Popover>
      </section>

      <section className="flex pr-2 items-center justify-end">
        <CustomSelect />
        <OutlinedInput placeholder="搜索"  sx={{height: '2rem'}}  />
      </section>
    </div>
  );
};

export default TableToolbar;

// 开关和描述文字
export const SwitchLabels = () => {
  return (
    <FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} label="Label" />
    </FormGroup>
  );
};

// 下拉框
export const CustomSelect = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
   
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        // label="Age"
        placeholder={`选择字段`}
        size="small"
        onChange={handleChange}
        className={`w-6rem h-2rem`}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
  );
};

 // <FormControl>
      {/* <InputLabel id="demo-simple-select-label">{`选择字段`}</InputLabel> */}
    // </FormControl>
