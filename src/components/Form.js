import React from 'react'

function Form() {
  return (
    <div className="form">
        <center><h3>Test your data</h3></center><br/>
        <form>
            <input type="text" placeholder='src_ip'/>
            <input type="text" placeholder='dst_ip'/>
            <input type="text" placeholder='src_port'/>
            <input type="text" placeholder='dst_port'/>
            <input type="text" placeholder='protocol'/>
            <input type="text" placeholder='timestamp'/>
            <input type="text" placeholder='flow_duration'/>
            <input type="text" placeholder='flow_byts_s'/>
            <input type="text" placeholder='flow_pkts_s'/>
            <input type="text" placeholder='fwd_pkts_s'/>
            <input type="text" placeholder='bwd_pkts_s'/>
            <input type="text" placeholder='tot_fwd_pkts'/>
            <input type="text" placeholder='tot_bwd_pkts'/>
            <input type="text" placeholder='totlen_fwd_pkts'/>
            <input type="text" placeholder='totlen_bwd_pkts'/>
            <input type="text" placeholder='fwd_pkt_len_max'/>
            <input type="text" placeholder='fwd_pkt_len_min'/>
            <input type="text" placeholder='fwd_pkt_len_mean'/>
            <input type="text" placeholder='fwd_pkt_len_std'/>
            <input type="text" placeholder='bwd_pkt_len_max'/>
            <input type="text" placeholder='bwd_pkt_len_mean'/>
            <input type="text" placeholder='bwd_pkt_len_std'/>
            <input type="text" placeholder='pkt_len_max'/>
            <input type="text" placeholder='pkt_len_min'/>
            <input type="text" placeholder='pkt_len_mean'/>
            <input type="text" placeholder='pkt_len_std'/>
            <input type="text" placeholder='pkt_len_var'/>
            <input type="text" placeholder='fwd_header_len'/>
            <input type="text" placeholder='bwd_header_len'/>
            <input type="text" placeholder='fwd_seg_size_min'/>
            <input type="text" placeholder='fwd_act_data_pkts'/>
            <input type="text" placeholder='flow_iat_mean'/>
            <input type="text" placeholder='flow_iat_max'/>
            <input type="text" placeholder='flow_iat_min'/>
            <input type="text" placeholder='flow_iat_std'/>
            <input type="text" placeholder='fwd_iat_tot'/>
            <input type="text" placeholder='fwd_iat_max'/>
            <input type="text" placeholder='fwd_iat_min'/>
            <input type="text" placeholder='fwd_iat_mean'/>
            <input type="text" placeholder='fwd_iat_std'/>
            <input type="text" placeholder='bwd_iat_tot'/>
            <input type="text" placeholder='bwd_iat_max'/>
            <input type="text" placeholder='bwd_iat_min'/>
            <input type="text" placeholder='bwd_iat_mean'/>
            <input type="text" placeholder='bwd_iat_std'/>
            <input type="text" placeholder='fwd_psh_flags'/>
            <input type="text" placeholder='bwd_psh_flags'/>
            <input type="text" placeholder='fwd_urg_flags'/>
            <input type="text" placeholder='bwd_urg_flags'/>
            <input type="text" placeholder='fin_flag_cnt'/>
            <input type="text" placeholder='syn_flag_cnt'/>
            <input type="text" placeholder='rst_flag_cnt'/>
            <input type="text" placeholder='psh_flag_cnt'/>
            <input type="text" placeholder='ack_flag_cnt'/>
            <input type="text" placeholder='urg_flag_cnt'/>
            <input type="text" placeholder='ece_flag_cnt'/>
            <input type="text" placeholder='down_up_ratio'/>
            <input type="text" placeholder='pkt_size_avg'/>
            <input type="text" placeholder='init_fwd_win_byts'/>
            <input type="text" placeholder='init_bwd_win_byts'/>
            <input type="text" placeholder='active_max'/>
            <input type="text" placeholder='active_min'/>
            <input type="text" placeholder='active_mean'/>
            <input type="text" placeholder='active_std'/>
            <input type="text" placeholder='idle_max'/>
            <input type="text" placeholder='idle_min'/>
            <input type="text" placeholder='idle_mean'/>
            <input type="text" placeholder='idle_std'/>
            <input type="text" placeholder='fwd_byts_b_avg'/>
            <input type="text" placeholder='fwd_pkts_b_avg'/>
            <input type="text" placeholder='bwd_byts_b_avg'/>
            <input type="text" placeholder='bwd_pkts_b_avg'/>
            <input type="text" placeholder='fwd_blk_rate_avg'/>
            <input type="text" placeholder='bwd_blk_rate_avg'/>
            <input type="text" placeholder='fwd_seg_size_avg'/>
            <input type="text" placeholder='bwd_seg_size_avg'/>
            <input type="text" placeholder='cwe_flag_count'/>
            <input type="text" placeholder='subflow_fwd_pkts'/>
            <input type="text" placeholder='subflow_bwd_pkts'/>
            <input type="text" placeholder='subflow_fwd_byts'/>
            <input type="text" placeholder='subflow_bwd_byts'/>

            <br/><br/>
            <center><input className="form-submit-button" type='submit'/></center>
        </form>


    </div>
  )
}

export default Form