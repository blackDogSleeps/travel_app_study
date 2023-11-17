<template>
  <div>
    <h1>Bookmarks</h1>
    <p v-if="noBookmarks">No bookmarks yet</p>
    <section
      v-for="bookmark in bookmarks"
      :key="bookmark.slug"
      class="bookmarks-section">
        <h3>{{ bookmark.destinationName }}</h3>
        <div
          v-for="experience in bookmark.experiences"
          :key="experience.slug"
          >
          <a :href="getLink(experience)" target="blank">
            <div
              class="experience-bookmark">
              <div class="img-container">
                <img :src="`/images/${experience.experienceImage}`">
              </div>
              <div class="experience-description-container">
                <h4>
                  {{ experience.experienceName }}
                </h4>
                <p>{{ formatDescription(experience.experienceDescription) }}</p>
              </div>
              <div >
                <div
                  @click.prevent="removeBookmark(bookmark, experience)"
                  class="close-button">+</div>
              </div>
            </div>
          </a>
        </div>
        <div class="blank-space"></div>
    </section>
  </div>
</template>

<script>
import { calculateDate } from '../utils/dateUtils';
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      bookmarks: 'bookmarks/getBookmarks',
    }),

    noBookmarks() {
      return this.bookmarks.length < 1;
    },
  },

  methods:{
    ...mapActions({
      removeBookmarkFromState: 'bookmarks/removeBookmark',
    }),

    removeBookmark(bookmark, experience) {
      const destination = this.bookmarks
        .find(item => item.destinationId === bookmark.destinationId);
      
      const existingExperience = destination.experiences
        .find(item => item.regionId === experience.regionId);

      this.removeBookmarkFromState({ destination, existingExperience });
    },

    formatDescription(description) {
      const cutFrom = 0;
      const cutTo = 400;
      const formattedDescription = description
        .slice(cutFrom, cutTo) + '...'; 
      return formattedDescription;
    },

    getLink(experience) {
      const dates = calculateDate();
      const load = 
        `https://www.expedia.com/Hotel-Search?startDate=`+
        `${dates.currentDate}&endDate=`+
        `${dates.nextDate}&regionId=`+
        `${experience.regionId}&adults=1`
      return load;
    }
  },


}

</script>

<style lang="css" scoped>
.bookmarks-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  column-gap: 30px;
  row-gap: 30px;
}

.bookmarks-section h3 {
  margin-bottom: 0;
}

.experience-bookmark {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  column-gap: 10px;
  transition: 0.2s;
  border-radius: 5px;
  overflow: clip;
}

.experience-bookmark:hover {
  box-shadow: 2px 2px 5px grey;
  transition: 0.2s;
}

.experience-bookmark .img-container {
  width: 300px;
  height: 200px;
}

.img-container img {
  width: 300px;
  border-radius: 5px;
}

.experience-description-container {
  margin: 0;
  padding: 0;
  padding: 15px 20px;

}

.experience-description-container > p {
  margin: 0;
  padding: 0;
  font-weight: 200;
}

.blank-space {
  position: relative;
  height: 30px;
}

.close-button {
  font-size: 44px;
  font-weight: 100 !important;
  color: grey;
  transform: rotate(45deg);
  position: relative;
  top: -5px;
  right: 5px;
}

.close-button:hover {
  opacity: 0.7;
}
</style>