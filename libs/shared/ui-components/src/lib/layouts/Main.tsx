import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, InputLabel, TextareaAutosize } from '@mui/material';
import { DefaultTable, Dropdown } from '@shared/components';

const Main = () => {
  return (
    <div className="p-3">
        <div className="sapfin-action-bar py-2 px-4 bg-light d-flex justify-content-between align-items-center">
            <div className="sapfin-source-dropdown d-flex align-items-center gap-2">
                <InputLabel className='sapfin-source-label' >Source</InputLabel>
                <Dropdown />
            </div>
        </div>
        <div className="container-fluid shadow rounded bg-white mt-4">
            <div className="">
                <div className="row p-2">
                    <div className="col-7">
                        <h6 className="fw-bold mb-2">Preview Folder</h6>
                        <div className="row">
                            <div className="col px-0">
                                <DefaultTable />
                            </div>
                            <div className="col px-0">
                                <DefaultTable isCheckBox={true}/>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end mt-1'>
                            <Button className="border border-secondary ms-1" variant="contained"  color="inherit">Reject</Button>
                            <Button className="border border-secondary ms-1" variant="contained"  color="inherit">Download</Button>

                        </div>
                    </div>
                    <div className="col-1 d-flex justify-content-center align-items-center">
                        <div>
                            <Button className='border border-secondary mb-1' variant="contained" color="inherit" startIcon={<ArrowForwardIosIcon />}></Button>
                            <Button className='border border-secondary mt-1' variant="contained" color="inherit" startIcon={<ArrowBackIosNewIcon />}></Button>
                        </div>
                    </div>
                    <div className="col-4">
                        <h6 className="fw-bold mb-2">Upload Folder</h6>
                        <DefaultTable />
                        <div className='d-flex justify-content-end mt-1'>
                            <Button className="border border-secondary ms-1" variant="contained"  color="inherit">Test Run</Button>
                            <Button className="border border-secondary ms-1" variant="contained"  color="inherit">Actual Run</Button>
                        </div>
                    </div>
                </div>
                <div className='container-fluid mt-3 pb-3'>
                    <h6 className="fw-bold">SAP Response</h6>
                    <TextareaAutosize
                    className="form-control w-100"
                    maxRows={4}
                    minRows={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue={'qqqqqqqqqqqqqqqqqqqqqqqqq\nqqqqqqqqqqqqqqqqqqqqqqqqq'}
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default Main;