import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface searchProp {
    label: string;
    value: string;
    setValue: (value: string) => void;
    resetPage: (value: number) => void;
    disabled: boolean;
}
export default function SearchComponent( { label, value, setValue, resetPage, disabled }: searchProp) {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', mb: 2, display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={label}
        inputProps={{ 'aria-label': label }}
        value={value}
        size='small'
        onChange={(e) => {
            setValue(e.target.value);
            resetPage(1);
          }}
        disabled={disabled}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

