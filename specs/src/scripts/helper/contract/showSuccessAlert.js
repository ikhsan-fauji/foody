export default (alert) => {
  describe('Show Success Alert', () => {
    it('must rendering title and message when call alert.success', () => {
      const title = 'Awesome';
      const message = 'Processing success';
      alert.success(title, message);

      const containerElement = document.querySelector('#alert-container');
      const titleElement = document.querySelector('.alert-title');
      const messageElement = document.querySelector('.alert-message');
      expect(containerElement.textContent).not.toBeNull();
      expect(titleElement.textContent).toBe(title);
      expect(messageElement.textContent).toBe(message);
    });

    const emptyTestCases = [undefined, ''];
    emptyTestCases.forEach((param) => {
      it(`must render empty string of title and message when alert.success called with ${param}`, () => {
        alert.success(param, param);

        const containerElement = document.querySelector('#alert-container');
        const titleElement = document.querySelector('.alert-title');
        const messageElement = document.querySelector('.alert-message');
        expect(containerElement.textContent).not.toBeNull();
        expect(titleElement.textContent).toBe('');
        expect(messageElement.textContent).toBe('');
      });
    });
  });
};
