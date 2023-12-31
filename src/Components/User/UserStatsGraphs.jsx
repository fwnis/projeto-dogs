import React from "react";
import styles from "./UserStatsGraphs.module.css";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (data) {
      const graphData = data.map((item) => {
        return {
          x: item.title,
          y: Number(item.acessos),
        };
      });
      setTotal(
        data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b, 0)
      );
      setGraph(graphData);
    }
  }, [data]);

  return (
    <section
      className={`${styles.graph} ${total < 1 && styles.nostats} animeLeft`}
    >
      {total < 1 ? (
        <p>Você ainda não possui nenhum acesso.</p>
      ) : (
        <>
          <div className={`${styles.total} ${styles.graphItem}`}>
            <p>Acessos</p>
            <span>{total}</span>
          </div>
          <div className={styles.graphItem}>
            <VictoryChart>
              <VictoryBar alignment="start" data={graph}></VictoryBar>
            </VictoryChart>
          </div>
          <div className={styles.graphItem}>
            <VictoryPie
              data={graph}
              innerRadius={50}
              padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
              style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: "#fff",
                  strokeWidth: 2,
                },
                labels: {
                  fontSize: 24,
                  fill: "#333",
                },
              }}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default UserStatsGraphs;
