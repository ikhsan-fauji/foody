import NotificationHelper from '../../../../src/scripts/helper/notification-helper';

describe('Notification Helper', () => {
  describe('#sendNotification', () => {
    it('should not call _checkPermission', () => {
      spyOn(NotificationHelper, '_checkPermission');
      spyOn(NotificationHelper, '_checkAvailability').and.returnValue(false);
      expect(NotificationHelper.sendNotification({})).not.toBeDefined();
      expect(NotificationHelper._checkPermission).not.toHaveBeenCalled();
    });

    it('should not call _requestPermission', () => {
      spyOn(NotificationHelper, '_checkPermission').and.returnValue(true);
      spyOn(NotificationHelper, '_requestPermission');
      spyOn(NotificationHelper, '_checkAvailability').and.returnValue(true);
      expect(NotificationHelper.sendNotification({})).not.toBeDefined();
      expect(NotificationHelper._requestPermission).not.toHaveBeenCalled();
    });

    it('should call _requestPermission', () => {
      spyOn(NotificationHelper, '_checkPermission').and.returnValue(false);
      spyOn(NotificationHelper, '_requestPermission');
      spyOn(NotificationHelper, '_checkAvailability').and.returnValue(true);
      spyOn(NotificationHelper, '_showNotification');
      expect(NotificationHelper.sendNotification({})).not.toBeDefined();
      expect(NotificationHelper._requestPermission).toHaveBeenCalled();
      expect(NotificationHelper._showNotification).not.toHaveBeenCalled();
    });

    xit('should call _showNotification', () => {
      spyOn(NotificationHelper, '_checkPermission').and.returnValue(true);
      spyOn(NotificationHelper, '_checkAvailability').and.returnValue(true);
      spyOn(NotificationHelper, '_showNotification');
      expect(
        NotificationHelper.sendNotification({ title: 'A', options: {} })
      ).not.toBeDefined();
      expect(NotificationHelper._showNotification).toHaveBeenCalledWith({
        title: 'A',
        options: {}
      });
    });
  });
});
