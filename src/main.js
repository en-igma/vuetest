const applicationData = {};

function validate(form, rules) {
  const errors = {};
  for (const field in rules) {
    const rule = rules[field];
    const value = form[field];
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = rule.message;
    } else if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message;
    }
  }
  return errors;
}

const BasicInfo = {
  template: `
    <div class="container">
      <h2>Basic Information</h2>
      <div v-for="(err, field) in errors" :key="field" class="error">{{ err }}</div>
      <input v-model="form.name" placeholder="Name" />
      <input v-model="form.email" placeholder="Email" />
      <input v-model="form.phone" placeholder="Phone" />
      <button @click="next">Next</button>
    </div>
  `,
  data() {
    return {
      form: {
        name: applicationData.name || '',
        email: applicationData.email || '',
        phone: applicationData.phone || ''
      },
      errors: {}
    };
  },
  methods: {
    next() {
      this.errors = validate(this.form, validationRules.basicInfo);
      if (Object.keys(this.errors).length === 0) {
        Object.assign(applicationData, this.form);
        this.$router.push('/additional');
      }
    }
  }
};

const AdditionalInfo = {
  template: `
    <div class="container">
      <h2>Additional Information</h2>
      <div v-for="(err, field) in errors" :key="field" class="error">{{ err }}</div>
      <textarea v-model="form.resume" placeholder="Resume"></textarea>
      <button @click="submit">Submit</button>
    </div>
  `,
  data() {
    return {
      form: {
        resume: applicationData.resume || ''
      },
      errors: {}
    };
  },
  methods: {
    submit() {
      this.errors = validate(this.form, validationRules.additionalInfo);
      if (Object.keys(this.errors).length === 0) {
        Object.assign(applicationData, this.form);
        this.$router.push('/complete');
      }
    }
  }
};

const Complete = {
  template: `
    <div class="container">
      <h2>Application Submitted</h2>
      <p>Thank you, {{ data.name }}! We have received your application.</p>
      <pre>{{ data }}</pre>
    </div>
  `,
  computed: {
    data() {
      return applicationData;
    }
  }
};

const routes = [
  { path: '/', component: BasicInfo },
  { path: '/additional', component: AdditionalInfo },
  { path: '/complete', component: Complete }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const app = Vue.createApp({});
app.use(router);
app.mount('#app');
