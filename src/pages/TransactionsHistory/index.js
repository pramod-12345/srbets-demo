import { Pagination, Table, Tabs } from "components";
import { useAxios } from "hooks";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { fetchTransaction } from "services/dashboard.service";

const TransactionHistory = () => {
  const tabs = [
    { id: "deposit", label: "Deposit" },
    { id: "withdraw", label: "Withdraw" },
  ];

  const { makeRequest } = useAxios();
  const [currentPage, setCurrentPage] = useState(0);
  const [withdrawPage, setWithdrawPage] = useState(0);
  const [transactionData, setTransactionData] = useState(null);
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const data = transactionData?.body?.content;
  const pageSize = 10;

  const columns = [
    { header: "ID", key: "transactionId" },
    { header: "AMOUNT", key: "amount", showOnMobile: true },
    {
      header: "STATUS",
      key: "transactionStatus",
      showOnMobile: true,
      render: (value) => {
        const getStatus = (status) => {
          const transactionStatus = status?.toUpperCase();
          const statusDetails = {
            PENDING: "text-mustardYellow",
            SUCCESS: "text-green-500",
            FAILED: "text-Amaranth",
            FAIL: "text-Amaranth",
          };
          return statusDetails[transactionStatus];
        };

        return <span className={`${getStatus(value)} uppercase`}>{value}</span>;
      },
    },
    {
      header: "DATE",
      key: "initiatedAt",
      showOnMobile: true,
      render: (value) => {
        return <span>{moment(value).format("DD MMM YYYY [at] hh:mm A")}</span>;
      },
    },
  ];

  const FetchDepositTransaction = useCallback(
    (page = 0) => {
      const type = selectedTab === "deposit" ? "credit" : "debit";
      fetchTransaction(makeRequest, setTransactionData, page, pageSize, type);
    },
    [makeRequest, pageSize, selectedTab]
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setWithdrawPage(newPage);
    FetchDepositTransaction(newPage);
  };

  useEffect(() => {
    FetchDepositTransaction();
  }, [FetchDepositTransaction, selectedTab]);

  const handleTabChange = (newTabId) => {
    setSelectedTab(newTabId);
    setCurrentPage(0);
    setWithdrawPage(0);
  };

  return (
    <div className="mt-5 flex flex-col items-center justify-between ">
      <Tabs
        tabs={tabs}
        isOptions={true}
        activeTabId={selectedTab}
        onChange={handleTabChange}
      >
        <div id="deposit" className="space-y-8">
          <Table columns={columns} data={data} />
          {transactionData?.body?.content?.length === 0 ||
          transactionData?.body?.totalPages === 1 ? null : (
            <Pagination
              currentPage={currentPage}
              totalPages={transactionData?.body?.totalPages || 1}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        <div id="withdraw" className="mt-5">
          <Table columns={columns} data={data} />
          {transactionData?.body?.content?.length === 0 ||
          transactionData?.body?.totalPages === 1 ? null : (
            <Pagination
              currentPage={withdrawPage}
              totalPages={transactionData?.body?.totalPages || 1}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default TransactionHistory;
