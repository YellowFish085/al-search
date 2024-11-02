const ActivityFeed = {
  setup() {
    return () => Vue.h('div', { id: 'activity-feed' },
      store.activities.length
        ? store.activities.map((activity) => Vue.h(ActivityFeedEntry, {activity: activity}))
        : Vue.h('span', browser.i18n.getMessage('ACTIVITY_NoActivities')),
    );
  },
};