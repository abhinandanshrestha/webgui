import React,{useState} from 'react';

function Form() {

  const [record,setRecord]=useState([]);
  const [formData, setFormData] = useState({
    src_ip: "",
    dst_ip: "",
    src_port: "",
    dst_port: "",
    protocol: "",
    timestamp: "",
    flow_duration: "",
    flow_byts_s: "",
    flow_pkts_s: "",
    fwd_pkts_s: "",
    bwd_pkts_s: "",
    tot_fwd_pkts: "",
    tot_bwd_pkts: "",
    totlen_fwd_pkts: "",
    totlen_bwd_pkts: "",
    fwd_pkt_len_max: "",
    fwd_pkt_len_min: "",
    fwd_pkt_len_mean: "",
    fwd_pkt_len_std: "",
    bwd_pkt_len_max: "",
    bwd_pkt_len_mean: "",
    bwd_pkt_len_std: "",
    pkt_len_max: "",
    pkt_len_min: "",
    pkt_len_mean: "",
    pkt_len_std: "",
    pkt_len_var: "",
    fwd_header_len: "",
    bwd_header_len: "",
    fwd_seg_size_min: "",
    fwd_act_data_pkts: "",
    flow_iat_mean: "",
    flow_iat_max: "",
    flow_iat_min: "",
    flow_iat_std: "",
    fwd_iat_tot: "",
    fwd_iat_max: "",
    fwd_iat_min: "",
    fwd_iat_mean: "",
    fwd_iat_std: "",
    bwd_iat_tot: "",
    bwd_iat_max: "",
    bwd_iat_min: "",
    bwd_iat_mean: "",
    bwd_iat_std: "",
    fwd_psh_flags: "",
    bwd_psh_flags: "",
    fwd_urg_flags: "",
    bwd_urg_flags: "",
    fin_flag_cnt: "",
    syn_flag_cnt: "",
    rst_flag_cnt: "",
    psh_flag_cnt: "",
    ack_flag_cnt: "",
    urg_flag_cnt: "",
    ece_flag_cnt: "",
    down_up_ratio: "",
    pkt_size_avg: "",
    init_fwd_win_byts: "",
    init_bwd_win_byts: "",
    active_max: "",
    active_min: "",
    active_mean: "",
    active_std: "",
    idle_max: "",
    idle_min: "",
    idle_std: "",
    fwd_byts_b_avg: "",
    fwd_pkts_b_avg: "",
    bwd_byts_b_avg: "",
    bwd_pkts_b_avg: "",
    fwd_blk_rate_avg: "",
    bwd_blk_rate_avg: "",
    fwd_seg_size_avg: "",
    bwd_seg_size_avg: "",
    cwe_flag_count: "",
    subflow_fwd_pkts: "",
    subflow_bwd_pkts: "",
    subflow_fwd_byts: "",
    subflow_bwd_byts:""
  })

  const handleFormData=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setFormData({ ...formData, [name]:value });
    console.log(name,value);
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    const newRecord={...formData};
    console.log(record);
    setRecord([...record,newRecord]);
    console.log(record);
  }

  return (
    <div className="form">
        <center><h3>Test your data</h3></center><br/>
        <form  onSubmit={handleSubmit}>
            <input type="text" placeholder='src_ip' name="src_ip" value={formData.src_ip} onChange={handleFormData}/>
            <input type="text" placeholder='dst_ip' name="dst_ip" value={formData.dst_ip} onChange={handleFormData}/>
            <input type="text" placeholder='src_port' name="src_port" value={formData.src_port} onChange={handleFormData}/>
            <input type="text" placeholder='dst_port' name="dst_port" value={formData.dst_port} onChange={handleFormData} />
            <input type="text" placeholder='protocol' name="protocol" value={formData.protocol} onChange={handleFormData}/>
            <input type="text" placeholder='timestamp' name="timestamp" value={formData.timestamp} onChange={handleFormData}/>
            <input type="text" placeholder='flow_duration' name="flow_duration" value={formData.flow_duration} onChange={handleFormData}/>
            <input type="text" placeholder='flow_byts_s' name="flow_byts_s" value={formData.flow_byts_s} onChange={handleFormData}/>
            <input type="text" placeholder='flow_pkts_s' name="flow_pkts_s" value={formData.flow_pkts_s} onChange={handleFormData} />
            <input type="text" placeholder='fwd_pkts_s' name="fwd_pkts_s" value={formData.fwd_pkts_s} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_pkts_s' name="bwd_pkts_s" value={formData.bwd_pkts_s} onChange={handleFormData}/>
            <input type="text" placeholder='tot_fwd_pkts' name="tot_fwd_pkts" value={formData.tot_fwd_pkts} onChange={handleFormData}/>
            <input type="text" placeholder='tot_bwd_pkts' name="tot_bwd_pkts" value={formData.tot_bwd_pkts} onChange={handleFormData}/>
            <input type="text" placeholder='totlen_fwd_pkts' name="totlen_fwd_pkts" value={formData.totlen_fwd_pkts} onChange={handleFormData}/>
            <input type="text" placeholder='totlen_bwd_pkts' name="totlen_bwd_pkts" value={formData.totlen_bwd_pkts} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_pkt_len_max' name="fwd_pkt_len_max" value={formData.fwd_pkt_len_max} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_pkt_len_min' name="fwd_pkt_len_min" value={formData.fwd_pkt_len_min} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_pkt_len_mean' name="fwd_pkt_len_mean" value={formData.fwd_pkt_len_mean} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_pkt_len_std' name="fwd_pkt_len_std" value={formData.fwd_pkt_len_std} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_pkt_len_max' name="bwd_pkt_len_max" value={formData.bwd_pkt_len_max} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_pkt_len_mean' name="bwd_pkt_len_mean" value={formData.bwd_pkt_len_mean} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_pkt_len_std' name="bwd_pkt_len_std" value={formData.bwd_pkt_len_std} onChange={handleFormData}/>
            <input type="text" placeholder='pkt_len_max' name="pkt_len_max" value={formData.pkt_len_max} onChange={handleFormData}/>
            <input type="text" placeholder='pkt_len_min' name="pkt_len_min" value={formData.pkt_len_min} onChange={handleFormData}/>
            <input type="text" placeholder='pkt_len_mean' name="pkt_len_mean" value={formData.pkt_len_mean} onChange={handleFormData}/>
            <input type="text" placeholder='pkt_len_std' name="pkt_len_std" value={formData.pkt_len_std} onChange={handleFormData}/>
            <input type="text" placeholder='pkt_len_var' name="pkt_len_var" value={formData.pkt_len_var} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_header_len' name="fwd_header_len" value={formData.fwd_header_len} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_header_len' name="bwd_header_len" value={formData.bwd_header_len} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_seg_size_min' name="fwd_seg_size_min" value={formData.fwd_seg_size_min} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_act_data_pkts' name="fwd_act_data_pkts" value={formData.fwd_act_data_pkts} onChange={handleFormData}/>
            <input type="text" placeholder='flow_iat_mean' name="flow_iat_mean" value={formData.flow_iat_mean} onChange={handleFormData}/>
            <input type="text" placeholder='flow_iat_max' name="flow_iat_max" value={formData.flow_iat_max} onChange={handleFormData}/>
            <input type="text" placeholder='flow_iat_min' name="flow_iat_min" value={formData.flow_iat_min} onChange={handleFormData}/>
            <input type="text" placeholder='flow_iat_std' name="flow_iat_std" value={formData.flow_iat_std} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_iat_tot' name="fwd_iat_tot" value={formData.fwd_iat_tot} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_iat_max' name="fwd_iat_max" value={formData.fwd_iat_max} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_iat_min' name="fwd_iat_min" value={formData.fwd_iat_min} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_iat_mean' name="fwd_iat_mean" value={formData.fwd_iat_mean} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_iat_std' name="fwd_iat_std" value={formData.fwd_iat_std} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_iat_tot' name="bwd_iat_tot" value={formData.bwd_iat_tot} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_iat_max' name="bwd_iat_max" value={formData.bwd_iat_max} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_iat_min' name="bwd_iat_min" value={formData.bwd_iat_min} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_iat_mean' name="bwd_iat_mean" value={formData.bwd_iat_mean} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_iat_std' name="bwd_iat_std" value={formData.bwd_iat_std} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_psh_flags' name="fwd_psh_flags" value={formData.fwd_psh_flags} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_psh_flags' name="bwd_psh_flags" value={formData.bwd_psh_flags} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_urg_flags' name="fwd_urg_flags" value={formData.fwd_urg_flags} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_urg_flags' name="bwd_urg_flags" value={formData.bwd_urg_flags} onChange={handleFormData}/>
            <input type="text" placeholder='fin_flag_cnt' name="fin_flag_cnt" value={formData.fin_flag_cnt} onChange={handleFormData}/>
            <input type="text" placeholder='syn_flag_cnt' name="syn_flag_cnt" value={formData.syn_flag_cnt} onChange={handleFormData}/>
            <input type="text" placeholder='rst_flag_cnt' name="rst_flag_cnt" value={formData.rst_flag_cnt} onChange={handleFormData}/>
            <input type="text" placeholder='psh_flag_cnt' name="psh_flag_cnt" value={formData.psh_flag_cnt} onChange={handleFormData}/>
            <input type="text" placeholder='ack_flag_cnt' name="ack_flag_cnt" value={formData.ack_flag_cnt} onChange={handleFormData}/>
            <input type="text" placeholder='urg_flag_cnt' name="urg_flag_cnt" value={formData.urg_flag_cnt} onChange={handleFormData}/>
            <input type="text" placeholder='ece_flag_cnt' name="ece_flag_cnt" value={formData.ece_flag_cnt} onChange={handleFormData}/>
            <input type="text" placeholder='down_up_ratio' name="down_up_ratio" value={formData.down_up_ratio} onChange={handleFormData}/>
            <input type="text" placeholder='pkt_size_avg' name="pkt_size_avg" value={formData.pkt_size_avg} onChange={handleFormData}/>
            <input type="text" placeholder='init_fwd_win_byts' name="init_fwd_win_byts" value={formData.init_fwd_win_byts} onChange={handleFormData}/>
            <input type="text" placeholder='init_bwd_win_byts' name="init_bwd_win_byts" value={formData.init_bwd_win_byts} onChange={handleFormData}/>
            <input type="text" placeholder='active_max' name="active_max" value={formData.active_max} onChange={handleFormData}/>
            <input type="text" placeholder='active_min' name="active_min" value={formData.active_min} onChange={handleFormData}/>
            <input type="text" placeholder='active_mean' name="active_mean" value={formData.active_mean} onChange={handleFormData}/>
            <input type="text" placeholder='active_std' name="active_std" value={formData.active_std} onChange={handleFormData}/>
            <input type="text" placeholder='idle_max' name="idle_max" value={formData.idle_max} onChange={handleFormData}/>
            <input type="text" placeholder='idle_min' name="idle_min" value={formData.idle_min} onChange={handleFormData}/>
            <input type="text" placeholder='idle_mean' name="idle_mean" value={formData.idle_mean} onChange={handleFormData}/>
            <input type="text" placeholder='idle_std' name="idle_std" value={formData.idle_std} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_byts_b_avg' name="fwd_byts_b_avg" value={formData.fwd_byts_b_avg} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_pkts_b_avg' name="fwd_pkts_b_avg" value={formData.fwd_pkts_b_avg} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_byts_b_avg' name="bwd_byts_b_avg" value={formData.bwd_byts_b_avg} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_pkts_b_avg' name="bwd_pkts_b_avg" value={formData.bwd_pkts_b_avg} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_blk_rate_avg' name="fwd_blk_rate_avg" value={formData.fwd_blk_rate_avg} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_blk_rate_avg' name="bwd_blk_rate_avg" value={formData.bwd_blk_rate_avg} onChange={handleFormData}/>
            <input type="text" placeholder='fwd_seg_size_avg' name="fwd_seg_size_avg" value={formData.fwd_seg_size_avg} onChange={handleFormData}/>
            <input type="text" placeholder='bwd_seg_size_avg' name="bwd_seg_size_avg" value={formData.bwd_seg_size_avg} onChange={handleFormData}/>
            <input type="text" placeholder='cwe_flag_count' name="cwe_flag_count" value={formData.cwe_flag_count} onChange={handleFormData}/>
            <input type="text" placeholder='subflow_fwd_pkts' name="subflow_fwd_pkts" value={formData.subflow_fwd_pkts} onChange={handleFormData}/>
            <input type="text" placeholder='subflow_bwd_pkts' name="subflow_bwd_pkts" value={formData.subflow_bwd_pkts} onChange={handleFormData}/>
            <input type="text" placeholder='subflow_fwd_byts' name="subflow_fwd_byts" value={formData.subflow_fwd_byts} onChange={handleFormData}/>
            <input type="text" placeholder='subflow_bwd_byts' name="subflow_bwd_byts" value={formData.subflow_bwd_yts} onChange={handleFormData}/>

            <br/><br/>
            <center><button className="form-submit-button" type='submit'>Submit</button></center>
        </form>


    </div>
  )
}

export default Form