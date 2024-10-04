interface AccountModel{
    UserName: string;
    Password: string;
    StaffId: string;
    Power: {
        Dashboard: boolean;
        Tenant: boolean;
        Room: boolean;
        Service: boolean;
        Staff: boolean;
        Statistic: boolean;
        Account : boolean;
        
    }
}
export default AccountModel;