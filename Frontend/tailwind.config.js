module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: '640px',   
      md: '768px',    
      lg: '1024px',   
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        /* Text Colors */
        text: {
          success: "var(--text-success)",
          'success-light': "var(--text-success-light)",
          primary: "var(--text-primary)",
          'accent-blue': "var(--text-accent-blue)",
          link: "var(--text-link)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          light: "var(--text-light)",
          error: "var(--text-error)",
          warning: "var(--text-warning)",
          'error-bright': "var(--text-error-bright)",
          white: "var(--text-white)",
          'white-transparent': "var(--text-white-transparent)"
        },
        /* Background Colors */
        background: {
          'accent-transparent': "var(--bg-accent-transparent)",
          primary: "var(--bg-primary)",
          'blue-light': "var(--bg-blue-light)",
          'success-light': "var(--bg-success-light)",
          'gray-light': "var(--bg-gray-light)",
          'success-pale': "var(--bg-success-pale)",
          neutral: "var(--bg-neutral)",
          base: "var(--bg-base)",
          'error-light': "var(--bg-error-light)",
          'error-pale': "var(--bg-error-pale)",
          'warning-light': "var(--bg-warning-light)",
          white: "var(--bg-white)"
        },
        /* Border Colors */
        border: {
          success: "var(--border-success)",
          accent: "var(--border-accent)",
          light: "var(--border-light)",
          gray: "var(--border-gray)",
          error: "var(--border-error)",
          warning: "var(--border-warning)"
        },
        /* Component-Specific Colors */
        header: {
          background: "var(--header-bg)",
          border: "var(--header-border)"
        },
        button: {
          'primary-bg': "var(--button-primary-bg)",
          'secondary-bg': "var(--button-secondary-bg)",
          'primary-text': "var(--button-primary-text)",
          'secondary-text': "var(--button-secondary-text)"
        },
        search: {
          border: "var(--search-border)",
          placeholder: "var(--search-placeholder)"
        },
        table: {
          'header-bg': "var(--table-header-bg)",
          border: "var(--table-border)"
        },
        progress: {
          fill: "var(--progress-fill)",
          bg: "var(--progress-bg)"
        }
      },
      /* Typography */
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)'
      },
      fontWeight: {
        'normal': 'var(--font-weight-normal)',
        'medium': 'var(--font-weight-medium)',
        'semibold': 'var(--font-weight-semibold)',
        'bold': 'var(--font-weight-bold)'
      },
      lineHeight: {
        'tight': 'var(--line-height-tight)',
        'snug': 'var(--line-height-snug)',
        'base': 'var(--line-height-base)',
        'relaxed': 'var(--line-height-relaxed)',
        'loose': 'var(--line-height-loose)',
        'xl': 'var(--line-height-xl)',
        '2xl': 'var(--line-height-2xl)'
      },
      /* Spacing */
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
        '5xl': 'var(--spacing-5xl)',
        '6xl': 'var(--spacing-6xl)',
        '7xl': 'var(--spacing-7xl)',
        '8xl': 'var(--spacing-8xl)',
        '9xl': 'var(--spacing-9xl)',
        '10xl': 'var(--spacing-10xl)',
        '11xl': 'var(--spacing-11xl)'
      },
      /* Border Radius */
      borderRadius: {
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)'
      }
    }
  },
  plugins: []
};