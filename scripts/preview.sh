#!/bin/sh
# Run the actual Jekyll site with automatic rebuilding and browser refresh.
set -eu
cd "$(dirname "$0")/.."

# Prefer Homebrew Ruby to the older macOS system Ruby when available.
for ruby_bin in /opt/homebrew/opt/ruby@3.3/bin /usr/local/opt/ruby@3.3/bin /opt/homebrew/opt/ruby/bin /usr/local/opt/ruby/bin; do
  if [ -x "$ruby_bin/ruby" ]; then
    export PATH="$ruby_bin:$PATH"
    break
  fi
done

if ! ruby -e 'exit(Gem::Version.new(RUBY_VERSION) >= Gem::Version.new("3.1") ? 0 : 1)'; then
  echo "Ruby 3.1 or newer is required. On macOS, run: brew install ruby@3.3"
  exit 1
fi

# Use a separate gem directory for each Ruby ABI version.
ruby_abi=$(ruby -rrbconfig -e 'print RbConfig::CONFIG["ruby_version"]')
export GEM_HOME="$PWD/local/gems/$ruby_abi"
export GEM_PATH="$GEM_HOME"
export GEM_SPEC_CACHE="$PWD/local/gem-spec-cache"
export PATH="$GEM_HOME/bin:$PATH"

if ! gem list --installed bundler --version 2.4.22 >/dev/null 2>&1; then
  gem install bundler --version 2.4.22 --no-document
fi

bundle _2.4.22_ config set --local path vendor/bundle
if ! bundle _2.4.22_ check >/dev/null 2>&1; then
  bundle _2.4.22_ install
fi

echo "Preview: http://localhost:4000"
echo "Save a file to rebuild and refresh. Press Ctrl+C to stop."
exec bundle _2.4.22_ exec jekyll serve --config _config.yml,_config.local.yml "$@"
