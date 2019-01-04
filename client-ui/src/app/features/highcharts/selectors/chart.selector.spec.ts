import * as fromChart from '../reducers/chart.reducer';
import * as fromChartSelectors from './chart.selector';

describe('Chart selectors', () => {

  it('should select chartState', () => {
    expect(
      fromChartSelectors.selectChartState.projector(
        {
          chartState: fromChart.initialState
        }
      )
    ).toBe(fromChart.initialState);
  });

  it('should select pointMouseOverEvent', () => {
    const mouseEvent = {
        x: 1
    };

    expect(
      fromChartSelectors.selectPointMouseOverEvent.projector({
          pointMouseOverEvent: mouseEvent
      })
    ).toBe(mouseEvent);

  });

  it('should select pointXValue', () => {
    const xValue = 10;
    expect(
      fromChartSelectors.selectPointXValue.projector(
          {
            target: {x: xValue}
          }
      )
    ).toBe(xValue);
  });

});
