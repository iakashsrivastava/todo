import renderer, { act } from 'react-test-renderer';

import Main from "./../containers/Main.container.react";
import React from 'react';

describe('Main Container', () => {
    
    it('API call should be called with correct Get params', async () => {  

        const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => {
            return Promise.resolve([]);
        });
        const setIsSpinnerVisible = jest.fn();

        let component;
        await act(async () => {
            component = renderer.create(<Main setIsSpinnerVisible={setIsSpinnerVisible}/>);
        });
        const headers = {  
            'X-Api-Key': process.env.REACT_APP_API_KEY ?? '',
            'Content-Type': 'application/json',
        };
        const requestOptions = {method: 'GET', headers};
        expect(fetchSpy).toBeCalledWith(process.env.REACT_APP_GET_URL ?? '', requestOptions);
        fetchSpy.mockRestore();
    });

    it('Match Dom against an empty response', async () => {
        const FAKE_TODO = [];
        
        const setIsSpinnerVisible = jest.fn();
        const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => {
            return Promise.resolve(FAKE_TODO);
        });
        let component;
  
        await act(async () => {
            component = renderer.create(<Main setIsSpinnerVisible={setIsSpinnerVisible}/>);
        });

        expect(component.toJSON()).toMatchSnapshot();
        fetchSpy.mockRestore();
      });

      it('Match Dom against todo list received as api response', async () => {
        const FAKE_TODO = [{
            "id": "1",
            "description": "File 2020 Taxes",
            "isComplete": true,
            "dueDate": "2020-03-10T17:50:44.673Z"
          },
          {
            "id": "2",
            "description": "Fold laundry",
            "isComplete": true,
            "dueDate": null
          }
        ];
        
        const setIsSpinnerVisible = jest.fn();
        const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => {
            return Promise.resolve(FAKE_TODO);
        });
        let component;
  
        await act(async () => {
            component = renderer.create(<Main setIsSpinnerVisible={setIsSpinnerVisible}/>);
        });

        expect(component.toJSON()).toMatchSnapshot();
        fetchSpy.mockRestore();
      });
  
  });